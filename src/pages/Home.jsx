import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select'
import { BsStars } from 'react-icons/bs'
import { HiOutlineCode } from 'react-icons/hi'
import Editor from '@monaco-editor/react'
import { IoCloseSharp, IoCopy } from 'react-icons/io5'
import { PiExportBold } from 'react-icons/pi'
import { ImNewTab } from 'react-icons/im'
import { FiRefreshCcw } from 'react-icons/fi'
import { GoogleGenAI } from '@google/genai'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const Home = () => {
  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstarp', label: 'HTML + Bootstarp' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstarp', label: 'HTML + Tailwind + Bootstarp' },
  ]

  const [outputScreen, SetOutputScreen] = useState(false)
  const [tab, SetTab] = useState(1)
  const [prompt, SetPrompt] = useState('')
  const [framework, SetFramework] = useState(options[0])
  const [code, SetCode] = useState('')
  const [loading, SetLoading] = useState(false)
  const [isNewTabOpen, SetIsNewTabOpen] = useState(false)

  function extractCode(response) {
    const match = response.match(
      /```(?:html|javascript|css|[\w]*)?\n([\s\S]*?)```/
    )
    return match ? match[1].trim() : response.trim()
  }

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  })

  async function getResponse() {
    try {
      SetLoading(true)
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in *Markdown fenced code blocks*.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file`,
      })
      SetCode(extractCode(response.text))
      SetOutputScreen(true)
    } catch (err) {
      toast.error('Failed to generate code')
      console.error(err)
    } finally {
      SetLoading(false)
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success('Code copied to clipboard')
    } catch {
      toast.error('Failed to copy')
    }
  }

  const downloadFile = () => {
    const fileName = 'GenUI-Code.html'
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
    toast.success('File downloaded successfully')
  }

  return (
    <>
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 px-4 sm:px-6 lg:px-12 xl:px-[100px] mt-6 mb-10 w-full pb-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-[#141319] rounded-xl p-5 sm:p-6 md:p-8">
          <h3 className="text-[22px] sm:text-[25px] font-semibold text-white">
            AI Component Generator
          </h3>
          <p className="text-gray-400 mt-2 text-[14px] sm:text-[16px]">
            Describe your component and let AI code it for you.
          </p>

          <p className="text-[15px] font-bold mt-4">Framework</p>
          <Select
            className="mt-2"
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: '#000',
                borderColor: '#333',
                color: '#fff',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: '#000',
                color: '#fff',
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#333' : '#000',
                color: '#fff',
                cursor: 'pointer',
              }),
              singleValue: (base) => ({
                ...base,
                color: '#fff',
              }),
              placeholder: (base) => ({
                ...base,
                color: '#aaa',
              }),
            }}
            onChange={(e) => SetFramework(e)}
          />

          <p className="text-[15px] font-bold mt-5">Describe your component</p>
          <textarea
            onChange={(e) => SetPrompt(e.target.value)}
            value={prompt}
            className="w-full rounded-xl bg-[#09090B] mt-3 p-3 text-white text-[14px] resize-none min-h-[200px] sm:min-h-[180px] md:min-h-[150px]"
            placeholder="Describe your component in detail and let AI code it for you."
          ></textarea>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-3">
            <p className="text-gray-400 text-[14px]">
              Click on generate button to generate your code
            </p>
            <button
              onClick={getResponse}
              className="flex items-center justify-center p-[12px] sm:p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-[20px] gap-2 transition-all hover:opacity-80 text-white"
            >
              {loading ? <ClipLoader color="white" size={20} /> : <BsStars />}
              Generate
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full lg:w-1/2 bg-[#141319] rounded-xl overflow-auto h-[70vh] sm:h-[80vh] sm:min-h-[65vh] md:min-h-[60vh]">
          {!outputScreen ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="p-[20px] w-[70px] h-[70px] text-[30px] flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <HiOutlineCode />
              </div>
              <p className="text-gray-400 mt-3 text-[14px] sm:text-[16px]">
                Your component & code will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-[#17171C] w-full h-[55px] flex items-center gap-2 px-3 sm:px-6 overflow-auto">
                <button
                  onClick={() => SetTab(1)}
                  className={`w-1/2 p-2 rounded-lg cursor-pointer ${
                    tab === 1 ? 'bg-[#333]' : ''
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => SetTab(2)}
                  className={`w-1/2 p-2 rounded-lg cursor-pointer ${
                    tab === 2 ? 'bg-[#333]' : ''
                  }`}
                >
                  Preview
                </button>
              </div>

              <div className="bg-[#17171C] w-full h-[55px] flex items-center justify-between px-4 sm:px-6 overflow-auto">
                <p className="font-bold text-white text-[14px] sm:text-[16px]">
                  Code Editor
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  {tab === 1 ? (
                    <>
                      <button
                        className="w-[38px] h-[38px] rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                        onClick={copyCode}
                      >
                        <IoCopy />
                      </button>
                      <button
                        className="w-[38px] h-[38px] rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                        onClick={downloadFile}
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-[38px] h-[38px] rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                        onClick={() => SetIsNewTabOpen(true)}
                      >
                        <ImNewTab />
                      </button>
                      <button className="w-[38px] h-[38px] rounded-lg border border-zinc-800 flex items-center justify-center hover:bg-[#333]">
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="h-[calc(100%-110px)] overflow-auto">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    language="html"
                  />
                ) : (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full bg-white overflow-auto"
                    title="Preview"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Full Preview Modal */}
      {isNewTabOpen && (
        <div className="fixed inset-0 bg-white w-screen min-h-screen overflow-auto z-50">
          <div className="flex items-center justify-between px-5 h-[60px] border-b border-gray-300">
            <p className="font-bold text-black">Preview</p>
            <button
              className="w-[38px] text-black h-[38px] rounded-lg border border-gray-400 flex items-center justify-center hover:bg-gray-200"
              onClick={() => SetIsNewTabOpen(false)}
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="w-full h-[calc(100vh-60px)]"
          ></iframe>
        </div>
      )}
    </>
  )
}

export default Home
