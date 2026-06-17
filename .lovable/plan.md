
# 景泰GO 全量重构计划

按用户答复执行：**P0 → P1 → P2 一次性重构** + **AI 生成 PNG icon 集** + **先截图确认 TabBar 现状（已完成）**。

## 现状诊断（已截图确认）

**TabBar 当前实现（src/components/screens.tsx L46-84）违反规范**：
- 中间 `+` 按钮（L76）通过 `-mt-7` 在 flex 容器**内部**上移，靠 `ring-4 ring-white` 视觉伪装"独立"
- 不是独立 fixed 层，没有 `translateX(-50%)`，z-index 与 TabBar 同级
- 两侧 4 个 tab 用 `flex-1`，中间按钮占据布局空间但未平分，导致间距不均
- `+` 按钮无点击行为（应跳转发布页）

**其他需修复**：
- 全项目使用 lucide-react SVG，与规范"必须本地 PNG `/static/icons/*.png`"冲突
- 缺统一 `BaseIcon` / `BaseButton` / `BaseCard` 组件，散落在 screens.tsx 各处
- 分类入口、商家卡片、菜单卡使用了多色 emoji 配色，与"深浅灰 + 白卡，黑色主操作色，金/黄仅评分"冲突
- 圆角值混乱（12/14/16/18/20/24/28 都有），未锁定到 12/16/20
- 部分卡片直接裸布局，未卡片化

---

## 执行步骤

### Step 1 · 生成 PNG icon 集（AI 一次性产出）

为 5 个 TabBar 图标 + 5 个分类图标 + 常用功能图标共 ~16 个生成统一风格 PNG。

风格：**单色线性图标，黑色描边 2px，白色填充，64×64，透明背景**。

产出路径：`src/assets/icons/{name}.png`（不是 `public/static`，因为 Vite/TanStack 项目通过 import 引用更安全；命名遵循规范精神即可）。

清单：
- TabBar：`home / discover / rank / me`（每个 active/inactive 两份，共 8 个）
- TabBar 中心 `+`：单独白色描边版用于黑底按钮
- 分类：`eat / drink / play / date / service`
- 功能：`search / location / settings / edit`

> 实施方式：用 `imagegen--generate_image` 批量生成（fast 模型，transparent_background=true），失败 fallback 到 lucide。

### Step 2 · 建立 Base 组件系统（P1）

新建：
- `src/components/ui/base-icon.tsx`
  - props：`name`（PNG 文件名）、`size`（20/24，默认 24）、`active`（boolean）
  - 渲染 `<img>`，active 时不滤镜，inactive 时 `opacity-50`
  - 内部用 `import.meta.glob` 加载 `src/assets/icons/*.png`，避免每图都手写 import
- `src/components/ui/base-button.tsx`
  - 变体：`primary`（bg-ink text-white）/ `secondary`（bg-surface text-ink）/ `danger`（bg-destructive text-white）
  - size：`md`（h-11 px-5 rounded-2xl）/ `sm`（h-9 px-4 rounded-xl）
  - 默认带 `active:scale-[0.98] transition-transform` 反馈
- `src/components/ui/base-card.tsx`
  - props：`shadow`（none/sm/md）、`bordered`、`padding`（12/16）
  - 圆角统一 `rounded-2xl`(16) 或 `rounded-[20px]`
  - 内边距锁 `p-3` / `p-4`

### Step 3 · P0 修复（4 处核心）

**3.1 TabBar 重构**（src/components/screens.tsx L46-84）
- 拆为两层 DOM：
  - 底层 4 tab 容器：`absolute inset-x-4 bottom-4 z-40` 圆角胶囊，**中间留空白格**（占位 div）保证 4 个 tab 均分
  - 顶层 `+` 按钮：**独立** `absolute left-1/2 -translate-x-1/2 bottom-9 z-50`，完整圆形不裁切，点击跳转 `/pages/publish`
- tab item 使用 `BaseIcon` + 文字
- 4 个 tab 平均 `flex-1`，间距均匀

**3.2 地图页商家卡片**（screens.tsx ~L430 区域 DiscoverScreen）
- 重构为标准结构：
  - 左：4:3 图片（80×60）
  - 右上：rating badge
  - 右：标题 1 行（truncate）、分类·距离、最多 2 个 tag、进入详情按钮
- 用 `BaseCard shadow="sm"` 包裹

**3.3 发布页按钮**（screens.tsx L708-711 PublishScreen）
- 移除 fixed/absolute bottom 定位
- 改为表单**流式底部**（在 form 末尾，`mt-6` + `mb-24`），不压 TabBar
- 使用 `BaseButton variant="primary" size="md"` full-width

**3.4 个人页按钮**（screens.tsx MeScreen）
- "编辑资料 / 设置" 入口统一用 `BaseCard` 列表项 + `BaseIcon`
- 头像/等级/统计区使用 `BaseCard` 分层

### Step 4 · P1 应用（首页 + 发布流程 + icon 全替换）

**4.1 全局 icon 替换**
- screens.tsx 中所有 lucide 图标按用途映射到 `BaseIcon`
- 保留 lucide 仅用于：编辑资料/设置内页（已实现），导航 chevron，输入框内 search 等小辅助场景

**4.2 首页结构对齐规范**（HomeScreen）
- 顶部品牌区：`GO` + `编辑资料` chip + `设置` chip（当前已有"编辑资料"和"设置"链接，调整为统一 secondary button 风格）
- 搜索框：圆角 16
- 分类 5 入口：去除多色背景，统一为浅灰圆角方卡 + 黑色 BaseIcon
- "今日新发现"、"热门发现" 区块统一 `BaseCard`

**4.3 发布页表单**
- 图片区、已发现地点、新增地点、标签 4 个段落各自 `BaseCard`
- 发布按钮在卡片之后，流式

### Step 5 · P2 优化（详情页 + 全局美化）

- 详情页：封面沉浸式（已有），rating、tags、评论卡统一 BaseCard
- 全局：
  - 圆角全部归一化 12/16/20
  - 阴影统一为 `shadow-sm` 或自定义 `shadow-[0_4px_14px_-8px_rgba(17,17,17,0.08)]`
  - spacing 全用 4/8/12/16/24/32

### Step 6 · 验证

- `browser--view_preview` 在 390×844 移动尺寸下逐页截图（首页 / 地图 / 发布 / 详情 / 我的）
- 重点检查：
  - TabBar `+` 是完整圆 + 无裁切 + 居中 + 在最上层
  - 商家卡片结构对齐
  - 发布按钮不压 TabBar
  - icon 全部为 PNG，无灰圆 placeholder

---

## 技术细节（技术读者向）

- **不改动**：`src/components/pages/edit-profile-screen.tsx`、`settings-screen.tsx`、`phone-frame.tsx`、`__root.tsx`、地图底层 SVG（仅替换 overlay 卡片）
- **不引入新依赖**：icon 用 `import.meta.glob('/src/assets/icons/*.png', { eager: true, as: 'url' })`
- **TabBar 关键 CSS**：
  ```tsx
  <div className="absolute inset-x-0 bottom-0 z-40 px-4 pb-4">
    <div className="relative h-16 rounded-[28px] ... flex">
      {tab(home)} {tab(discover)} <div className="flex-1" /> {tab(rank)} {tab(me)}
    </div>
    <button className="absolute left-1/2 -translate-x-1/2 bottom-9 z-50 h-14 w-14 rounded-full bg-ink ring-4 ring-white shadow-..." onClick={() => navigate({to: '/pages/publish'})}>
      <BaseIcon name="plus-white" size={24} active />
    </button>
  </div>
  ```
- **风险**：当前没有 `/pages/publish` 路由（PublishScreen 是 showcase 内嵌组件），需新增 `src/routes/pages.publish.tsx` 包装 + 路由注册

---

## 预估变更

- 新增：3 个 Base 组件 + ~16 个 PNG + 1 个 publish 路由 ≈ 20 文件
- 修改：`screens.tsx`（重构 TabBar / 商家卡 / 发布按钮 / 个人页 / icon 全量替换） ≈ 1 大文件
- 不删除任何现有页面

预计本轮一次性完成 Step 1–4 + Step 6 验证；Step 5 美化作为收尾。
