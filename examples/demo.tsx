import React, { Component, useState, useRef } from 'react'
import AntdFormMaker from './../packages/index'
import { Input, Checkbox, Button, Form, Select } from 'antd'


const CustomInputWithCheck = (props: any) => {
  // debugger
  const { value, onChange } = props
  const [checkVal, setCheckVal] = useState(value || '')
  return <>
    <Checkbox checked={checkVal} onChange={e => {
      setCheckVal(e.target.checked)
      onChange(e.target.checked)
    }} style={{ marginLeft: 10 }}>需要跟读</Checkbox>
  </>
}


const Demo = (props: any) => {
  const dataSource = [{ a: 1, b: 2, c: 3, cus: true }, { a: 2, b: 3, c: 4, cus: false }]
  const columns = [
    {
      rowId:1,
      label:'a',
      prop:'a',
      component:Input,
      col:{
        span:12
      },
      defaultVal:'1',
      rules:[{required:true,message:'不能为空'}]
    },
    {
      rowId:1,
      label:'下拉1',
      prop:'a1',
      component:Select,
      options:[{label:'下拉1',value:'2'}],
      col:{
        span:12
      }
    },
    {
      rowId:2,
      label:'a2',
      prop:'a12',
      component:Input,
      col:{
        span:12
      }
    },
    {
      rowId:2,
      label:'a3',
      prop:'a3',
      component:CustomInputWithCheck,
      col:{
        span:12
      },
      rules:[{required:true,message:'请选择'}]
    }
  ]
  const formMakerRefs = useRef({})

  const getForm = async() => {
    const { current: { getFieldValue,validateFields } }: any = formMakerRefs
    const res = await validateFields()
    const value = getFieldValue()
    debugger
  }

  return <>
    <h2>dmeo</h2>
    <AntdFormMaker  ref={formMakerRefs}  columns={columns} formAttrs={{labelCol:{span:3}}} />
    <Button onClick={() => getForm()}>获取表单</Button>
  </>

}

export default Demo