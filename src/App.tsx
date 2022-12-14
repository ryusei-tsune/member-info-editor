import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import { animateScroll as scroller } from 'react-scroll'
import { FaEdit, FaPaperclip } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import './App.css'
import { Member } from './states/type'
import { InputField } from './components/InputField'

const App = () => {
  const [fileName, setFileName] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [memberInfo, setMemberInfo] = useState<Member>(
    {
      id: -1,
      class: 0,
      lname: '',
      fname: '',
      elname: '',
      efname: '',
      email: '',
      career1: '',
      career2: '',
      career3: '',
      career4: '',
      career5: '',
      study: '',
      hobby: '',
      language: '',
      comment: ''
    }
  )

  const classRef = useRef<HTMLInputElement>(null!)
  const lastNameRef = useRef<HTMLInputElement>(null!)
  const firstNameRef = useRef<HTMLInputElement>(null!)
  const enLastNameRef = useRef<HTMLInputElement>(null!)
  const enFirstNameRef = useRef<HTMLInputElement>(null!)
  const emailRef = useRef<HTMLInputElement>(null!)
  const career1Ref = useRef<HTMLInputElement>(null!)
  const career2Ref = useRef<HTMLInputElement>(null!)
  const career3Ref = useRef<HTMLInputElement>(null!)
  const career4Ref = useRef<HTMLInputElement>(null!)
  const career5Ref = useRef<HTMLInputElement>(null!)
  const studyRef = useRef<HTMLInputElement>(null!)
  const hobbyRef = useRef<HTMLInputElement>(null!)
  const languageRef = useRef<HTMLInputElement>(null!)
  const commentRef = useRef<HTMLInputElement>(null!)

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

  const selectMember = (id: number) => {
    const member: Member = members.filter((m) => (m.id === id))[0]
    setMemberInfo(member)
    scroller.scrollToTop()
  }

  const initialMemberInfo = () => {
    setMemberInfo(
      {
        id: -1,
        class: 0,
        lname: '',
        fname: '',
        elname: '',
        efname: '',
        email: '',
        career1: '',
        career2: '',
        career3: '',
        career4: '',
        career5: '',
        study: '',
        hobby: '',
        language: '',
        comment: ''
      }
    )
  }

  const deleteMember = (id: number) => {
    const infoFlag = (memberInfo.id === id || memberInfo.id === -1)
    setMembers(members.filter((member) => (member.id !== id)))

    if (infoFlag) {
      initialMemberInfo()
    } else {
      selectMember(memberInfo.id)
    }
  }

  const resisterMember = () => {
    const id = memberInfo.id
    let tempMembers: Member[] = members
    const tempMemberInfo: Member = {
      id: Number(tempMembers[tempMembers.length - 1].id) + 1,
      class: Number(classRef.current.value),
      lname: lastNameRef.current.value,
      fname: firstNameRef.current.value,
      elname: enLastNameRef.current.value,
      efname: enFirstNameRef.current.value,
      email: emailRef.current.value,
      career1: career1Ref.current.value || '-',
      career2: career2Ref.current.value || '-',
      career3: career3Ref.current.value || '-',
      career4: career4Ref.current.value || '-',
      career5: career5Ref.current.value || '-',
      study: studyRef.current.value || '-',
      hobby: hobbyRef.current.value || '-',
      language: languageRef.current.value || '-',
      comment: commentRef.current.value || '-'
    }
    if (id === -1) {
      tempMembers = [...members, tempMemberInfo]
    }
    else {
      tempMemberInfo.id = tempMembers[id].id
      tempMembers[id] = tempMemberInfo
    }
    setMembers(tempMembers)

    initialMemberInfo()
  }

  const clickDownload = () => {
    if (members.length !== 0) {
      const fileName = 'download.json'
      const json = new Blob([JSON.stringify(members)], { type: 'text/json' })
      const url = URL.createObjectURL(json)
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.setAttribute('download', fileName)
      link.click()
      link.remove()
      URL.revokeObjectURL(url);
    } else {
      alert('????????????????????????????????????????????????')
    }
  }

  useEffect(() => {
    classRef.current.value = String(memberInfo.class)
    lastNameRef.current.value = memberInfo.lname
    firstNameRef.current.value = memberInfo.fname
    enLastNameRef.current.value = memberInfo.elname
    enFirstNameRef.current.value = memberInfo.efname
    emailRef.current.value = memberInfo.email || ""
    career1Ref.current.value = memberInfo.career1 || ""
    career2Ref.current.value = memberInfo.career2 || ""
    career3Ref.current.value = memberInfo.career3 || ""
    career4Ref.current.value = memberInfo.career4 || ""
    career5Ref.current.value = memberInfo.career5 || ""
    studyRef.current.value = memberInfo.study
    hobbyRef.current.value = memberInfo.hobby || ""
    languageRef.current.value = memberInfo.language || ""
    commentRef.current.value = memberInfo.comment || ""
  }, [memberInfo, members])

  const Header = () => {
    return (
      <div className='border border-blue-300 rounded mx-3 px-3'>
        <div className='font-bold text-xl my-2'>??????????????????????????????(JSON)??????????????? - ????????????????????????????????????</div>
        <div className='text-lg'>
          ??????????????????<a href='https://www.mis.cs.okayama-u.ac.jp/member.html' target='_blank' rel='noopener noreferrer'>?????????????????????????????????</a>????????????????????????????????????????????????????????????????????????
        </div>
      </div>
    )
  }

  const MemberList = () => {
    return (
      <div className='m-3 p-3'>
        <div>??????????????????????????????</div>
        <label htmlFor='importFile'>
          <div className='box-file'>
            <FaPaperclip className='icon' />
            {fileName !== '' ?
              <div className='ml-6'>
                <div className='box-file-title text-xs'>????????????</div>
                <div className='box-file-name text-center'>{fileName}</div>
              </div>
              :
              <div className='ml-6'>
                ?????????????????????
              </div>
            }
          </div>
        </label>
        <input id='importFile' type="file" hidden onChange={importData} />
        <div className='mt-4'>
          <div className='mb-2 mx-2 flex justify-between items-center'>
            <div>????????????????????? {members.length}</div>
            <DownloadButton />
          </div>
          {members.length === 0 ?
            <div className='border rounded p-2'>???????????????????????????</div>
            :
            <div className='border rounded py-2'>
              {members.map((member: Member, index: number) =>
                <div key={member.id} className='ml-10 py-1 flex grid grid-cols-2'>
                  <div className='col-span-1'>
                    {member.lname} {member.fname}
                  </div>
                  <div className='col-span-1 icon-space'>
                    <FaEdit className='icon' onClick={() => { selectMember(member.id) }}></FaEdit>
                    <MdDelete className='icon' onClick={() => { deleteMember(member.id) }}></MdDelete>
                    {/* ?????????????????????????????????(space-between)?????????????????????????????????div?????????2???????????? */}
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
    const nameInputField: { lastName: string, lastNameRef: MutableRefObject<HTMLInputElement>, firstName: string, firstNameRef: MutableRefObject<HTMLInputElement> }[] = [
      { lastName: '??????', lastNameRef: lastNameRef, firstName: '??????', firstNameRef: firstNameRef },
      { lastName: 'Last name', lastNameRef: enLastNameRef, firstName: 'First name', firstNameRef: enFirstNameRef },
    ]
    const careerList: MutableRefObject<HTMLInputElement>[] = [career1Ref, career2Ref, career3Ref, career4Ref, career5Ref]
    const etcList: { text: string, ref: MutableRefObject<HTMLInputElement> }[] = [
      { text: '???????????????', ref: studyRef },
      { text: '??????', ref: hobbyRef },
      { text: '????????????', ref: languageRef },
      { text: '????????????', ref: commentRef },
    ]
    return (
      <div className='m-3 p-3 border'>
        <div className='flex mb-4 justify-between'>
          <div className='flex items-center'>
            ???
            <div className='w-7 mx-1'>
              <InputField type="number" ref={classRef} />
            </div>
            ???
          </div>
          <div>
            <button onClick={initialMemberInfo} className='border rounded-lg py-2 px-6 mb-4 my-button'>New!</button>
          </div>
        </div>

        <hr />

        {
          nameInputField.map((nameList: { lastName: string, lastNameRef: MutableRefObject<HTMLInputElement>, firstName: string, firstNameRef: MutableRefObject<HTMLInputElement> }) =>
            <div className='flex my-4' key={`name-inputField-${nameList.lastName}`}>
              <div className='w-1/2 mx-1'>
                <InputField type="text" placeholder={nameList.lastName} ref={nameList.lastNameRef} />
              </div>
              <div className='w-1/2 mx-1'>
                <InputField type="text" placeholder={nameList.firstName} ref={nameList.firstNameRef} />
              </div>
            </div>
          )
        }

        <hr />

        <div className='my-4'>
          <div className='w-full mx-1'>
            <InputField type="text" placeholder='@?????????????????????' ref={emailRef} />
          </div>
        </div>

        <hr />

        <div className='mt-4'>
          ??????
          {careerList.map((careerRef: MutableRefObject<HTMLInputElement>, index: number) =>
            <div className='my-4' key={`career-inputField-${index}`}>
              <div className='w-full mx-1'>
                <InputField type="text" ref={careerRef} />
              </div>
            </div>
          )}
        </div>

        {etcList.map((value: { text: string, ref: MutableRefObject<HTMLInputElement> }) =>
          <div key={`etc-inputField-${value.text}`}>
            <hr />
            <div className='my-4'>
              <div className='w-full mx-1'>
                <InputField type="text" placeholder={value.text} ref={value.ref} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const ResisterButton = () => {
    return (
      <div className='flex justify-center'>
        <button onClick={resisterMember} className='border rounded py-2 px-6 mb-4 my-button'>??????</button>
      </div>
    )
  }

  const DownloadButton = () => {
    return (
      <div className='text-center ml-2'>
        <button onClick={clickDownload} className='border rounded p-1 my-button'>??????????????????</button>
      </div>
    )
  }

  return (
    <div>
      <div className='app-bar text-3xl font-bold py-4 pl-3'>??????????????????</div>
      <div className=' flex justify-center'>
        <div className='mt-3 max-w-screen-xl my-container'>
          <Header />
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div className='sm:col-span-1'>
              <MemberList />
            </div>
            <div className='sm:col-span-2'>
              <MemberInfo />
              <ResisterButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
