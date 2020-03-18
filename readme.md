# [use-local-storage-hook](https://github.com/xiaomingTang/use-local-storage-hook)

### start
```
yarn add use-local-storage-hook
```

### exports
```typescript
import { useLocalStorage, NumberParam, DateParam, JsonParam } from "use-local-storage-hook"

interface CustomProp {
  success: boolean;
}

function useTest() {
  const [numberParam, setNumberParam] = useLocalStorage("__number-param__", NumberParam)
  const [dateParam, setDateParam] = useLocalStorage("__date-param__", DateParam)
  const [jsonParam, setJsonParam] = useLocalStorage<CustomProp>("__json-param__", JsonParam)

  /* do something */
}
```

### 项目特点
- typescript + react
- eslint
- dev模式下代码不经过eslint-loader, 以加速开发时的编译(该阶段配合编辑器进行eslint)
- prod模式下启用eslint-loader, 以使代码更加严谨
- 集成`webpack-bundle-analyzer`, 一键(`yarn run bundle`)分析打包状况

### warning
由于该项目主要个人独自使用, 因此将`.vscode`配置也上传到了git, 如其他人使用, 则你需要自主考虑将`.vscode`上传到git是否合适(可能会影响到同时使用该项目的其他人)
