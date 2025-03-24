 
// 🪵
  const phrases = document.querySelector('#phrases');

  phrases.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') { // LI要素がクリックされたか確認
      const selectedPhrase = event.target.textContent.trim();
      const outputBox = document.querySelector("#copyBodyTarget");

      // 現在のカーソル位置を取得
      const cursorPosition = outputBox.selectionStart;

      // テキストを分割して挿入
      const textBeforeCursor = outputBox.value.substring(0, cursorPosition);
      const textAfterCursor = outputBox.value.substring(cursorPosition);

      // 新しい値を設定
      outputBox.value = textBeforeCursor + selectedPhrase + textAfterCursor;

      // カーソル位置を調整（挿入したフレーズの後ろに設定）
      outputBox.selectionStart = outputBox.selectionEnd = cursorPosition + selectedPhrase.length;

      // テキストエリアにフォーカスを戻す
      outputBox.focus();
    }
  });

const toggleButton = document.getElementById("toggleDetailsButton");
const detailsSection = document.getElementById("detailsSection");
toggleButton.addEventListener("click", () => {
    if (detailsSection.style.display === "none") {
        detailsSection.style.display = "block";
        toggleButton.textContent = "詳細設定を閉じる";
    } else {
        detailsSection.style.display = "none";
        toggleButton.textContent = "詳細設定を開く";
    }
});


// 🪵本文コピー部分
  function copyBodyToClipboard() {
    const copyBodyTarget = document.getElementById("copyBodyTarget");
    copyBodyTarget.select();
    document.execCommand("Copy");
    alert("コピーできました！ : " + copyBodyTarget.value);
  }
// 🪵AI添削コピー部分
  function copyToClipboard() {
    const copyTarget = document.getElementById("copyTarget");
    copyTarget.select();
    document.execCommand("Copy");
    alert("コピーできました！ : " + copyTarget.value);
  }

  //🪵テンプレを言い換える部分（詳細画面）
  console.log(document.querySelector("#changeButton")); 
  const changeButton = document.querySelector("#changeButton");
  console.log("changeButton:", changeButton);
  const change_phrase_url = "{{ url_for('change_phrase', id=post.id) }}"

  changeButton.addEventListener('click',function(event){
      console.log("ボタンがクリックされました"); // デバッグ用ログ

      const copyTarget = document.getElementById("copyTarget");

        console.log("API URL:", change_phrase_url); // エンドポイントURLの確認
       // コメントを取得するためにAPIにリクエストを送る
      fetch(change_phrase_url)
      .then(response => {
          // レスポンスが正常かどうかチェック
          if (!response.ok) {
              throw new Error('ごめんなさい、うまく言い換えられなかったです...');
          }
          return response.json(); // レスポンスをJSON形式で返す
      })
      .then(data => {
          // 取得したコメントをコメントボックスに設定
          // ここで`data.new_body`が実際に取得するコメントの内容だと仮定
          copyTarget.value = data.new_body; // `data.new_body`はAPIから取得したコメント内容
      })
      .catch(error => {
          // エラーハンドリング
          console.error('エラー:', error);
          alert('ごめんなさい、うまく言い換えられなかったです');
      });
  });

//🪵いいねカウントのスクリプト
    function likePost(postId) {
        fetch(`/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId })
        })
        .then(response => response.json())
        .then(data => {
        // いいねカウントを更新
        document.getElementById('like-count-' + postId).textContent = data.likes;
        })
        .catch(error => console.error('Error:', error));
    }
