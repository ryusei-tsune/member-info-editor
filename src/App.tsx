import React, { useState, useRef } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import './App.css'

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
  const [members, setMembers] = useState<Member[]>([])
  const [memberInfo, setMemberInfo] = useState<Member | null>(null)
  const classRef = useRef<HTMLInputElement>(null)

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
      const name: string = e.currentTarget.files[0].name
      const text: string | ArrayBuffer | null = await readFile(e.currentTarget.files[0])
      if (typeof text === 'string') {
        const member_json: Member[] = JSON.parse(text)
        setFileName(name)
        setMembers(member_json)
      }
    }
  }

  const SelectMember = (index: number) => {
    setMemberInfo(members[index])
  }

  const ChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (classRef.current !== null){
      console.log(classRef.current.value)
    }
  }

  const Header = () => {
    return (
      <div className='border border-blue-300 rounded mx-3 px-3'>
        <div className='font-bold text-xl my-2'>メンバー情報ファイル(JSON)作成ツール - 後藤研究室ホームページ用</div>
        <div className='text-lg'>
          このサイトは<a href='https://www.mis.cs.okayama-u.ac.jp/member.html' target='_blank' rel='noopener noreferrer'>後藤研究室ホームページ</a>の、メンバー紹介を表示するためのデータを作成するツールです。
        </div>
      </div>
    )
  }

  const MemberList = () => {
    return (
      <div className='mx-3 pt-5'>
        <div className='import-title'>ファイルをインポート</div>
        <label htmlFor='importFile'>
          <div className='box-file'>
            {fileName !== '' ?
              <>
                <div className='box-file-title text-xs'>ファイル</div>
                <div className='box-file-name text-center'>{fileName}</div>
              </>
              :
              <>
                ファイルを選択
              </>
            }
          </div>
        </label>
        <input id='importFile' type="file" hidden onChange={importData} />
        <div>
          {members.length === 0 ?
            <div>データがありません</div>
            :
            <div className='border rounded pt-2 mb-5'>
              {members.map((member: Member, index: number) =>
                <div key={member.id} className='ml-10 py-1 flex grid grid-cols-2'>
                  <div className='col-span-1'>
                    {member.lname} {member.fname}
                  </div>
                  <div className='col-span-1 icon-space'>
                    <FaEdit className='icon' onClick={() => { SelectMember(index) }}></FaEdit>
                    <MdDelete className='icon'></MdDelete>
                    {/* アイコン同士のスペース(space-between)を上手く調整するためにdivタグを2つ入れる */}
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    )
  }

  const MemberInfo = () => {
    return (
      <div className='mx-3 pt-5'>
        {memberInfo?.lname} {memberInfo?.fname}
        <div className='flex '>第<input type="text" id="class" ref={classRef} className='border border-gray-300 text-gray-900 text-sm rounded-lg' onChange={ChangeText} />期</div>
      </div>
    )
  }

  return (
    <div>
      <div className='app-bar text-3xl font-bold py-4 pl-3'>入力ホーム</div>
      <div className=' flex justify-center'>
        <div className='mt-3 max-w-screen-xl'>
          <Header />
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div className='sm:col-span-1'>
              <MemberList />
            </div>
            <div className='sm:col-span-2'>
              <MemberInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
