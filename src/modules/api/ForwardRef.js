import { forwardRef, useImperativeHandle, useRef } from 'react'
import { TextInput, Switch } from 'react-native'

// Ref转发
// export default forwardRef((props, ref) => <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} ref={ref} {...props} />)

// 对外暴露api
export default forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    blur: () => {
      inputRef.current.blur()
    }
  }))
  return <TextInput ref={inputRef} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} {...props} />
})

