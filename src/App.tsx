import React, { useState } from 'react';
import './App.css';

type Member = {
  id: number,
  class: number,
  lname: string,
  fname: string,
  elname: string,
  efname: string,
  email: string,
  career1: string,
  career2: string,
  career3: string,
  career4: string,
  career5: string,
  study: string,
  hobby: string,
  language: string,
  comment: string,

}

const App = () => {
  const [fileName, setFileName] = useState('')
  const [isSelect, setIsSelect] = useState(false)
  const [members, setMembers] = useState<Member[]>([])

  const readFile = async (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (e) => {
        if (e.target !== null) {
          resolve(e.target.result);
        }
      });
      fileReader.addEventListener("error", (e) => {
        reject(e);
      });
      fileReader.readAsText(file);
    });
  }
  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      console.log(e.currentTarget.files)
      const name: string = e.currentTarget.files[0].name
      const text: string | ArrayBuffer | null = await readFile(e.currentTarget.files[0])
      if (typeof text == 'string') {
        const member_json: Member[] = JSON.parse(text)
        setIsSelect(true)
        setFileName(name)
        setMembers(member_json)
      }
    }
  }

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

  const MemberInfo = () => {
    return (
      <>
        <div>ファイルをインポート</div>
        <label htmlFor='import_file'>
          <div className='box-file'>
            {isSelect ?
              <>
                <div className='box-file-title text-xs'>ファイル</div>
                <div className='box-file-name text-center'>{fileName}</div>
              </>
              : 'ファイルを選択'}
          </div>
        </label>
        <input id='import_file' type="file" hidden onChange={importData} />
        <div>
          {members.length === 0 ?
            <div>データがありません</div>
            :
            <>
              {members.map((member: Member) =>
                <div key={member.id}> {member.lname} {member.fname}</div>
              )}
            </>
          }
        </div>
      </>
    )
  }

  return (
    <div>
      <div className='app-bar text-3xl font-bold py-4'>入力ホーム</div>
      <div className=' flex justify-center'>
        <div className='mt-3 max-w-5xl'>
          <Header />
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div className='sm:col-span-1'>
              <MemberInfo />
            </div>
            <div className='sm:col-span-2'>test2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
