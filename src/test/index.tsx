import React, { useEffect } from "react"
import ReactDom from "react-dom"
import { useLocalStorage, NumberParam, JsonParam } from "../index/index"

const app = document.querySelector("#app") as HTMLDivElement

function App() {
  const [numberParam, setNumberParam] = useLocalStorage("numberParam", NumberParam)
  const [jsonParam, setJsonParam] = useLocalStorage<{ success: boolean }>("jsonParam", JsonParam)

  useEffect(() => {
    setNumberParam(10)
    setJsonParam({ success: true })
  }, [setNumberParam, setJsonParam])

  return <>
    <pre>{`
请打开【开发者工具 -> Application -> localStorage】查看结果

numberParam: ${numberParam}

jsonParam: ${JSON.stringify(jsonParam, null, 2)}
    `}</pre>
  </>
}

ReactDom.render(
  <App />,
  app,
)
