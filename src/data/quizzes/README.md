# 퀴즈 데이터

**퀴즈 데이터는 개인 자료이므로 Git에서 제외됩니다.**

`*.json` 파일은 `.gitignore`에 등록되어 GitHub에 올라가지 않습니다.  
폴더 구조만 `.gitkeep`과 `index.js`로 유지됩니다.

## 로컬에서 퀴즈 추가하기

1. 해당 레벨 폴더에 JSON 파일을 추가합니다. (예: `c1/lesenTeil2.json`)
2. 같은 폴더의 `index.js`에서 import 후 배열에 등록합니다.

## 이미 Git에 올라간 JSON을 추적에서 제거할 때

한 번 커밋된 JSON을 인덱스에서만 빼려면 (로컬 파일은 유지):

```bash
git rm --cached src/data/quizzes/a1/*.json
git rm --cached src/data/quizzes/a2/*.json
git rm --cached src/data/quizzes/b1/*.json
git rm --cached src/data/quizzes/b2/*.json
git rm --cached src/data/quizzes/c1/*.json
```

또는 한 번에:

```bash
git rm --cached -r src/data/quizzes/
git add src/data/quizzes/
```

두 번째 방법은 `.gitignore`와 `.gitkeep`, `index.js`만 다시 스테이징합니다.  
이후 커밋하면 원격 저장소의 JSON은 다음 push부터 사라집니다.
