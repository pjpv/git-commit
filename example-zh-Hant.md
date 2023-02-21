# 簡介
規範的Git commit信息能夠幫助團隊成員更好地理解代碼變更，以及更方便地查找和追溯代碼修改歷史。

1. 提交信息應該簡短、清晰和易於理解，建議不超過50個字符。

2. 提交信息應該以動詞開頭，表達代碼變更的動作，例如「修復」、「添加」、「更新」、「刪除」等。

3. 提交信息應該描述清楚代碼變更的內容和原因，包括更改的文件、模塊、功能、bug編號等信息，以便其他開發人員快速了解變更的影響。

4. 提交信息可以使用標籤，如「feat」表示新功能，「fix」表示修復問題，「docs」表示文檔更新，「style」表示樣式修改，「refactor」表示重構代碼等。

5. 提交信息應該按照一定的格式進行書寫，可以使用以下格式：

    ```markdown
    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
    ```

   - type是提交類型，如上述標籤；
   - scope是影響的範圍，可以是模塊、文件夾、功能等；
   - subject是簡短的描述，可以包含動詞；
   - body是詳細的描述，可以包含更改的原因、影響等；
   - footer可以用來添加關閉的bug編號、關聯的Issue等信息。


# 示例


## feat (添加新功能, 新特性)
- 添加新功能
```markdown
feat(login): 添加用戶登錄功能
- 增加登錄頁面和登錄接口
- 實現用戶登錄的驗證和跳轉邏輯
- 優化登錄頁面的UI設計和交互效果
```
- 添加註冊功能
```markdown
feat(register): 添加用戶註冊功能
- 增加註冊頁面和註冊接口
- 實現用戶註冊的邏輯和驗證
- 優化註冊頁面的UI設計和交互效果
```
- 添加個人資料頁
```markdown
feat(profile): 添加用戶個人資料頁
- 增加個人資料頁和接口
- 實現用戶資料的編輯和保存
- 優化個人資料頁的UI設計和交互效果
```

## fix (修復bug)
- 修改登錄頁面的BUG
```markdown
fix(login): 修復用戶登錄頁面出現的 BUG
- 修復登錄按鈕無法點擊的問題
- 修復輸入框自動填充用戶名和密碼的問題
- 修復登錄頁面樣式錯亂的問題
```
- 修改註冊頁面的BUG
```markdown
fix(register): 修復用戶註冊接口返回錯誤信息
- 修復註冊接口返回的錯誤碼和錯誤信息不匹配的問題
- 修復註冊接口返回值中缺少必要字段的問題
```
- 修改個人資料頁的BUG
```markdown
fix(profile): 修復用戶個人資料頁無法保存修改的問題
- 修復用戶資料保存接口返回失敗的問題
- 修復用戶資料保存後無法正常顯示修改結果的問題
```


## docs (文檔修改, 代碼注釋)
- 更新項目介紹和安裝步驟
```markdown
docs(readme): 更新 README 文檔
- 更新項目介紹和安裝步驟
- 添加使用示例和注意事項
- 更新貢獻指南和代碼規範
```
- 更新用戶管理的 API 文檔
```markdown
docs(api): 更新 API 文檔
- 更新接口文檔和參數說明
- 修復接口文檔中的錯誤和不一致之處
- 添加新接口的文檔描述和使用示例
```
- 添加代碼注釋和說明文檔
```markdown
docs(comment): 添加代碼注釋和說明文檔
- 添加代碼文件頭部的注釋和版本信息
- 添加函數和方法的參數和返回值說明
- 更新部分代碼注釋的內容和格式
```

## style (頁面樣式)
~~原意為代碼格式修改, 不是 css 修改~~ (代碼格式化使用 chore)

- 添加新的CSS樣式
```markdown
feat: 添加一個新的 CSS 樣式以優化按鈕的視覺效果
- 新增一個名為 button-style 的 CSS 類
- 通過調整按鈕的字體大小、顏色等屬性來實現更好的視覺效果
```

- 修復CSS樣式
```markdown
fix: 修復 CSS 樣式問題導致的界面異常
- 修復 #1234 這個問題
- 通過調整按鈕的 padding 和 margin 等屬性來修復這個問題
```

## refactor (重構代碼, 不包括bug修復和新功能添加)
- 重構代碼結構或邏輯
```markdown
refactor(auth): 優化用戶認證邏輯
- 重構用戶認證的代碼結構和實現方式
- 優化用戶認證的性能和安全性
- 添加對多種認證方式的支持和擴展
```
- 重構頁面佈局和組件結構
```markdown
refactor(ui): 重構頁面佈局和組件結構
- 重新設計頁面的佈局和交互方式
- 重構頁面組件的實現方式和代碼結構
- 優化頁面的性能和用戶體驗
```

## Build (構建過程或外部依賴變動）
- 構建過程或外部依賴的變動，比如升級依賴庫、調整構建流程、增加、刪除或修改項目配置等。

```markdown
build(deps): 更新依賴庫版本
- 將express升級到4.17.1
- 更新webpack到5.31.0
- 升級typescript到4.3.5
```
```markdown
build: 重構構建腳本
- 重新組織webpack配置
- 優化構建速度
```
```markdown
build: 添加構建流程
- 添加持續集成/持續部署流程
- 添加docker構建流程
```
```markdown
build: 修復打包工具出現的錯誤
```

## chore (不影響代碼運行的變動)
- 刪除代碼
```markdown
chore: 刪除不必要的代碼和文件
- 刪除未使用的引用
- 移除冗餘的函數
```
- 格式化代碼
```markdown
chore(style): 統一代碼風格和格式
- 統一項目的代碼風格和命名規範
- 優化代碼格式和排版，提高代碼可讀性
- 添加代碼檢查和自動格式化工具
- 使用prettier格式化代碼
- 遵守代碼規範
- 為函數添加適當的空格和縮進
- 為代碼添加必要的注釋
- 刪除多餘的空行
```

# Scope

| Scope命名 | 說明 |
| --- | --- |
| A | 對大模塊A的修改 |
| A/B | 對小模塊B的修改 |
| A/B/func1 | 對B模塊下的功能模塊func1的修改 |
| A/B/func2 | 對B模塊下的功能模塊func2的修改 |
| A/C | 對小模塊C的修改 |
| A/C/func1 | 對C模塊下的功能模塊func1的修改 |
| A/C/func2 | 對C模塊下的功能模塊func2的修改 |

# Subject
```markdown
feat(System-A): 新增 Module-B-1 功能 Feature-B1-1
fix(System-A): 修復 Module-B-2 功能 Feature-B2-1 的問題
docs(System-A): 更新 Module-C 功能 Feature-C-1 的文檔
chore(System-A): 優化 Module-B-1 的代碼結構和命名規範
```
> 描述的應以動詞開頭，使用第一人稱現在時，比如 change，而不是 changed 或 changes

| Type     | 動詞        | 說明                                     |
| -------- |-----------| ---------------------------------------- |
| feat     | 添加、實現、引入  | 新增功能或特性                           |
| fix      | 修復、解決     | 修復 bug                                 |
| docs     | 更新、編寫、添加  | 文檔相關的更新                           |
| style    | 調整、修改     | 樣式相關的更新                           |
| refactor | 重構、優化、簡化、格式化 | 代碼重構或優化                           |
| test     | 添加、編寫、更新  | 測試相關的更新                           |
| chore    | 升級、更新、配置  | 項目構建或輔助工具相關的更新             |
| perf     | 優化、提升、改善  | 性能相關的更新                           |
| ci       | 配置、更新、優化  | CI/CD 相關的更新                          |
| build    | 構建、編譯、打包  | 編譯打包相關的更新                       |
| revert   | 撤銷、回滾、恢復  | 撤銷已提交的代碼修改                     |
| init     | 初始化、創建    | 項目初始化相關的更新                     |
| add      | 添加、引入     | 引入新的依賴或資源                       |
| remove   | 移除、刪除     | 刪除不再需要的依賴或資源                 |
| migrate  | 遷移、更新     | 遷移項目或庫                             |
| rename   | 重命名、修改    | 重命名或修改項目、庫、文件等             |
| merge    | 合併、整合     | 合併分支或代碼                           |
| update   | 更新、升級     | 更新依賴或升級版本                       |
| downgrade| 降級、回退     | 降級依賴或回退版本                       |
| optimize | 優化、調優     | 代碼性能優化                             |
| fixup    | 補充、修復     | 修復上一個提交的錯誤或不足               |
| squash   | 合併、整合     | 合併多個提交                             |
| release  | 發佈、更新     | 發佈新版本或更新版本                     |
| hotfix   | 熱修復、修復    | 緊急修復已發佈版本的 bug                 |

| 類型 | 模塊 | 動詞 | 說明 |
| ---- | ---- | ---- | ---- |
| feat | System-A/B | 添加 | 添加一個新的功能模塊 |
| fix | System-C | 修復 | 修復一個嚴重的 bug |
| style | System-B/Function-1 | 修改 | 修改模塊 B 中功能模塊 1 的樣式 |
| refactor | System-C | 重構 | 重構某些代碼邏輯，提升性能 |
| test | System-B/Function-2 | 添加 | 添加功能模塊 2 的自動化測試用例 |
| chore | System-A/B | 更新 | 更新項目的構建腳本 |
| perf | System-B/Function-3 | 優化 | 優化功能模塊 3 的性能表現 |
| ci | System-A | 更新 | 更新 CI/CD 流程 |
| build | System-C | 構建 | 修復某個構建步驟出現的錯誤 |
| revert | System-B/Function-4 | 撤銷 | 撤銷一次提交，恢復功能模塊 4 的狀態 |
| init | System-A | 初始化 | 初始化項目，創建項目基礎結構 |
| add | System-B | 添加 | 添加一個新的第三方庫 |
| remove | System-C/Function-5 | 移除 | 移除不再需要的功能模塊 5 |
| migrate | System-A/B | 遷移 | 將項目從舊的技術棧遷移到新的技術棧 |
| rename | System-C/Function-6 | 重命名 | 將功能模塊 6 重命名為新的名稱 |
| merge | System-A/B | 合併 | 合併分支，將代碼合併到主分支中 |
| update | System-B | 更新 | 更新依賴庫的版本 |
| downgrade | System-C | 降級 | 降級某個依賴庫的版本 |
| optimize | System-A | 優化 | 優化整個系統的性能表現 |
| fixup | System-C/Function-7 | 修復 | 修復上一個提交的不足之處 |
| squash | System-B | 合併 | 將多個提交合併成一個提交 |
| release | System-A | 發佈 | 發佈一個新版本 |
| hotfix | System-C | 修復 | 修復一個緊急的 bug |

```markdown
feat(System-A/B): 添加一個新的功能模塊
fix(System-C): 修復一個嚴重的 bug
style(System-B/Function-1): 修改模塊 B 中功能模塊 1 的樣式
refactor(System-C): 重構某些代碼邏輯，提升性能
test(System-B/Function-2): 添加功能模塊 2 的自動化測試用例
chore(System-A/B): 更新項目的構建腳本
perf(System-B/Function-3): 優化功能模塊 3 的性能表現
ci(System-A): 更新 CI/CD 流程
build(System-C): 構建修復某個構建步驟出現的錯誤
revert(System-B/Function-4): 撤銷上一次提交，恢復功能模塊 4 的狀態
init(System-A): 初始化項目，創建項目基礎結構
add(System-B): 添加一個新的第三方庫
remove(System-C/Function-5): 移除不再需要的功能模塊 5
migrate(System-A/B): 遷移將項目從舊的技術棧遷移到新的技術棧
rename(System-C/Function-6): 重命名功能模塊 6 為新的名稱
merge(System-A/B): 合併分支，將代碼合併到主分支中
update(System-B): 更新依賴庫的版本
downgrade(System-C): 降級某個依賴庫的版本
optimize(System-A): 優化整個系統的性能表現
fixup(System-C/Function-7): 修復上一個提交的不足之處
squash(System-B): 將多個提交合併成一個提交
release(System-A): 發佈一個新版本
hotfix(System-C): 修復一個緊急的 bug
```

# Body
```markdown
# 問題描述
在用戶註冊時，密碼長度必須大於等於8位，但是用戶輸入密碼時，沒有對其長度做出限制。這可能導致用戶設置過短的密碼，從而影響賬戶安全。

# 解決方案

在用戶註冊時，增加密碼長度的限制，當用戶輸入的密碼長度小於8位時，提示用戶密碼過短，要求其重新輸入。

# 修改內容

- 增加密碼長度的限制
- 提示用戶密碼過短
- 要求用戶重新輸入
```

# Footer

- 記錄關聯的 Bug ID
```markdown
Header

Body

禪道 #123 #456
```