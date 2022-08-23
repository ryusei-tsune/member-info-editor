import React from 'react';
import './App.css';


const App = () => {
  const Header = () => {
    return (
      <div className='border border-purple-300 rounded mx-3 px-3'>
        <div className='font-bold text-xl my-2'>メンバー情報ファイル(JSON)作成ツール - 後藤研究室ホームページ用</div>
        <div className='text-lg'>
          このサイトは<a href='https://www.mis.cs.okayama-u.ac.jp/member.html' target='_blank' rel='noopener noreferrer'>後藤研究室ホームページ</a>の、メンバー紹介を表示するためのデータを作成するツールです。
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='app-bar text-3xl font-bold py-4'>入力ホーム</div>
      <div className=' flex justify-center'>
        <div className='mt-3 container'>
          <Header />
        </div>
      </div>
    </div>
  );
}

export default App;
