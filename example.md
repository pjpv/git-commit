# 简介
规范的Git commit信息能够帮助团队成员更好地理解代码变更，以及更方便地查找和追溯代码修改历史。

1. 提交信息应该简短、清晰和易于理解，建议不超过50个字符。

2. 提交信息应该以动词开头，表达代码变更的动作，例如“修复”、“添加”、“更新”、“删除”等。

3. 提交信息应该描述清楚代码变更的内容和原因，包括更改的文件、模块、功能、bug编号等信息，以便其他开发人员快速了解变更的影响。

4. 提交信息可以使用标签，如“feat”表示新功能，“fix”表示修复问题，“docs”表示文档更新，“style”表示样式修改，“refactor”表示重构代码等。

5. 提交信息应该按照一定的格式进行书写，可以使用以下格式：

    ```markdown
    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
    ```

   - type是提交类型，如上述标签；
   - scope是影响的范围，可以是模块、文件夹、功能等；
   - subject是简短的描述，可以包含动词；
   - body是详细的描述，可以包含更改的原因、影响等；
   - footer可以用来添加关闭的bug编号、关联的Issue等信息。


# 示例


## feat (添加新功能, 新特性)
- 添加新功能
```markdown
feat(login): 添加用户登录功能
- 增加登录页面和登录接口
- 实现用户登录的验证和跳转逻辑
- 优化登录页面的UI设计和交互效果
```
 - 添加注册功能
```markdown
feat(register): 添加用户注册功能
- 增加注册页面和注册接口
- 实现用户注册的逻辑和验证
- 优化注册页面的UI设计和交互效果
```
- 添加个人资料页
```markdown
feat(profile): 添加用户个人资料页
- 增加个人资料页和接口
- 实现用户资料的编辑和保存
- 优化个人资料页的UI设计和交互效果
```

## fix (修复bug)
- 修改登录页面的BUG
```markdown
fix(login): 修复用户登录页面出现的 BUG
- 修复登录按钮无法点击的问题
- 修复输入框自动填充用户名和密码的问题
- 修复登录页面样式错乱的问题
```
- 修改注册页面的BUG
```markdown
fix(register): 修复用户注册接口返回错误信息
- 修复注册接口返回的错误码和错误信息不匹配的问题
- 修复注册接口返回值中缺少必要字段的问题
```
- 修改个人资料页的BUG
```markdown
fix(profile): 修复用户个人资料页无法保存修改的问题
- 修复用户资料保存接口返回失败的问题
- 修复用户资料保存后无法正常显示修改结果的问题
```


## docs (文档修改, 代码注释)
- 更新项目介绍和安装步骤
```markdown
docs(readme): 更新 README 文档
- 更新项目介绍和安装步骤
- 添加使用示例和注意事项
- 更新贡献指南和代码规范
```
- 更新用户管理的 API 文档
```markdown
docs(api): 更新 API 文档
- 更新接口文档和参数说明
- 修复接口文档中的错误和不一致之处
- 添加新接口的文档描述和使用示例
```
- 添加代码注释和说明文档
```markdown
docs(comment): 添加代码注释和说明文档
- 添加代码文件头部的注释和版本信息
- 添加函数和方法的参数和返回值说明
- 更新部分代码注释的内容和格式
```

## style (页面样式)
~~原意为代码格式修改, 不是 css 修改~~ (代碼格式化使用 chore)

- 添加新的CSS样式
```markdown
feat: 添加一个新的 CSS 样式以优化按钮的视觉效果
- 新增一个名为 button-style 的 CSS 类
- 通过调整按钮的字体大小、颜色等属性来实现更好的视觉效果
```

- 修复CSS样式
```markdown
fix: 修复 CSS 样式问题导致的界面异常
- 修复 #1234 这个问题
- 通过调整按钮的 padding 和 margin 等属性来修复这个问题
```

## refactor (重构代码, 不包括bug修复和新功能添加)
- 重构代码结构或逻辑
```markdown
refactor(auth): 优化用户认证逻辑
- 重构用户认证的代码结构和实现方式
- 优化用户认证的性能和安全性
- 添加对多种认证方式的支持和扩展
```
- 重构页面布局和组件结构
```markdown
refactor(ui): 重构页面布局和组件结构
- 重新设计页面的布局和交互方式
- 重构页面组件的实现方式和代码结构
- 优化页面的性能和用户体验
```

## Build (构建过程或外部依賴變動）
- 构建过程或外部依赖的变动，比如升级依赖库、调整构建流程、增加、删除或修改项目配置等。

```markdown
build(deps): 更新依赖库版本
- 将express升级到4.17.1
- 更新webpack到5.31.0
- 升级typescript到4.3.5
```
```markdown
build: 重构构建脚本
- 重新组织webpack配置
- 优化构建速度
```
```markdown
build: 添加构建流程
- 添加持续集成/持续部署流程
- 添加docker构建流程
```
```markdown
build: 修复打包工具出现的错误
```

## chore (不影响代码运行的变动)
- 删除代码
```markdown
chore: 删除不必要的代码和文件
- 删除未使用的引用
- 移除冗余的函数
```
- 格式化代码
```markdown
chore(style): 统一代码风格和格式
- 统一项目的代码风格和命名规范
- 优化代码格式和排版，提高代码可读性
- 添加代码检查和自动格式化工具
- 使用prettier格式化代码
- 遵守代码规范
- 为函数添加适当的空格和缩进
- 为代码添加必要的注释
- 删除多余的空行
```

# Scope

| Scope命名 | 说明 |
| --- | --- |
| A | 对大模块A的修改 |
| A/B | 对小模块B的修改 |
| A/B/func1 | 对B模块下的功能模块func1的修改 |
| A/B/func2 | 对B模块下的功能模块func2的修改 |
| A/C | 对小模块C的修改 |
| A/C/func1 | 对C模块下的功能模块func1的修改 |
| A/C/func2 | 对C模块下的功能模块func2的修改 |

# Subject
```markdown
feat(System-A): 新增 Module-B-1 功能 Feature-B1-1
fix(System-A): 修复 Module-B-2 功能 Feature-B2-1 的问题
docs(System-A): 更新 Module-C 功能 Feature-C-1 的文档
chore(System-A): 优化 Module-B-1 的代码结构和命名规范
```
> 描述的应以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes

| Type     | 动词        | 说明                                     |
| -------- |-----------| ---------------------------------------- |
| feat     | 添加、实现、引入  | 新增功能或特性                           |
| fix      | 修复、解决     | 修复 bug                                 |
| docs     | 更新、编写、添加  | 文档相关的更新                           |
| style    | 调整、修改     | 样式相关的更新                           |
| refactor | 重构、优化、简化、格式化 | 代码重构或优化                           |
| test     | 添加、编写、更新  | 测试相关的更新                           |
| chore    | 升级、更新、配置  | 项目构建或辅助工具相关的更新             |
| perf     | 优化、提升、改善  | 性能相关的更新                           |
| ci       | 配置、更新、优化  | CI/CD 相关的更新                          |
| build    | 构建、编译、打包  | 编译打包相关的更新                       |
| revert   | 撤销、回滚、恢复  | 撤销已提交的代码修改                     |
| init     | 初始化、创建    | 项目初始化相关的更新                     |
| add      | 添加、引入     | 引入新的依赖或资源                       |
| remove   | 移除、删除     | 删除不再需要的依赖或资源                 |
| migrate  | 迁移、更新     | 迁移项目或库                             |
| rename   | 重命名、修改    | 重命名或修改项目、库、文件等             |
| merge    | 合并、整合     | 合并分支或代码                           |
| update   | 更新、升级     | 更新依赖或升级版本                       |
| downgrade| 降级、回退     | 降级依赖或回退版本                       |
| optimize | 优化、调优     | 代码性能优化                             |
| fixup    | 补充、修复     | 修复上一个提交的错误或不足               |
| squash   | 合并、整合     | 合并多个提交                             |
| release  | 发布、更新     | 发布新版本或更新版本                     |
| hotfix   | 热修复、修复    | 紧急修复已发布版本的 bug                 |

| 类型 | 模块 | 动词 | 说明 |
| ---- | ---- | ---- | ---- |
| feat | System-A/B | 添加 | 添加一个新的功能模块 |
| fix | System-C | 修复 | 修复一个严重的 bug |
| style | System-B/Function-1 | 修改 | 修改模块 B 中功能模块 1 的样式 |
| refactor | System-C | 重构 | 重构某些代码逻辑，提升性能 |
| test | System-B/Function-2 | 添加 | 添加功能模块 2 的自动化测试用例 |
| chore | System-A/B | 更新 | 更新项目的构建脚本 |
| perf | System-B/Function-3 | 优化 | 优化功能模块 3 的性能表现 |
| ci | System-A | 更新 | 更新 CI/CD 流程 |
| build | System-C | 构建 | 修复某个构建步骤出现的错误 |
| revert | System-B/Function-4 | 撤销 | 撤销一次提交，恢复功能模块 4 的状态 |
| init | System-A | 初始化 | 初始化项目，创建项目基础结构 |
| add | System-B | 添加 | 添加一个新的第三方库 |
| remove | System-C/Function-5 | 移除 | 移除不再需要的功能模块 5 |
| migrate | System-A/B | 迁移 | 将项目从旧的技术栈迁移到新的技术栈 |
| rename | System-C/Function-6 | 重命名 | 将功能模块 6 重命名为新的名称 |
| merge | System-A/B | 合并 | 合并分支，将代码合并到主分支中 |
| update | System-B | 更新 | 更新依赖库的版本 |
| downgrade | System-C | 降级 | 降级某个依赖库的版本 |
| optimize | System-A | 优化 | 优化整个系统的性能表现 |
| fixup | System-C/Function-7 | 修复 | 修复上一个提交的不足之处 |
| squash | System-B | 合并 | 将多个提交合并成一个提交 |
| release | System-A | 发布 | 发布一个新版本 |
| hotfix | System-C | 修复 | 修复一个紧急的 bug |

```markdown
feat(System-A/B): 添加一个新的功能模块
fix(System-C): 修复一个严重的 bug
style(System-B/Function-1): 修改模块 B 中功能模块 1 的样式
refactor(System-C): 重构某些代码逻辑，提升性能
test(System-B/Function-2): 添加功能模块 2 的自动化测试用例
chore(System-A/B): 更新项目的构建脚本
perf(System-B/Function-3): 优化功能模块 3 的性能表现
ci(System-A): 更新 CI/CD 流程
build(System-C): 构建修复某个构建步骤出现的错误
revert(System-B/Function-4): 撤销上一次提交，恢复功能模块 4 的状态
init(System-A): 初始化项目，创建项目基础结构
add(System-B): 添加一个新的第三方库
remove(System-C/Function-5): 移除不再需要的功能模块 5
migrate(System-A/B): 迁移将项目从旧的技术栈迁移到新的技术栈
rename(System-C/Function-6): 重命名功能模块 6 为新的名称
merge(System-A/B): 合并分支，将代码合并到主分支中
update(System-B): 更新依赖库的版本
downgrade(System-C): 降级某个依赖库的版本
optimize(System-A): 优化整个系统的性能表现
fixup(System-C/Function-7): 修复上一个提交的不足之处
squash(System-B): 将多个提交合并成一个提交
release(System-A): 发布一个新版本
hotfix(System-C): 修复一个紧急的 bug
```

# Body
```markdown
# 问题描述
在用户注册时，密码长度必须大于等于8位，但是用户输入密码时，没有对其长度做出限制。这可能导致用户设置过短的密码，从而影响账户安全。

# 解决方案

在用户注册时，增加密码长度的限制，当用户输入的密码长度小于8位时，提示用户密码过短，要求其重新输入。

# 修改内容

- 增加密码长度的限制
- 提示用户密码过短
- 要求用户重新输入
```

# Footer

- 记录关联的 Bug ID
```markdown
Header

Body

禅道 #123 #456
```