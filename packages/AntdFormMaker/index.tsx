import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'

import groupBy from 'lodash.groupby'
import Form, { FormProps } from 'antd/lib/form'
import Row from 'antd/lib/row'
import Col, { ColProps } from 'antd/lib/col'

interface OpsType {
  label: string | number
  value: string | number
}

interface FormColItem {
  rowId?: string | number
  prop: string | number
  component: any
  defaultVal?: any
  options?: OpsType[]
  col: ColProps
}


interface IProps {
  columns: Array<FormColItem>
  formAttrs?: FormProps
}


const h = React.createElement


const RENDER_MAP: object = {
  Select: 'Option',
  Radio: 'Group'
}


const FormEle = (props: any) => {
  const { prop, rules, label, component, componentProps, options, componentChild } = props
  const { constructor: { name } } = typeof component == 'function' && component.prototype
  return <Form.Item rules={rules} name={prop} label={label}  >
    {h(name == 'Radio' ? component[RENDER_MAP[name]] : component,
      {
        ...componentProps,
        options
      },
      componentChild ||
      options && name !== 'CheckboxGroup' && Array.isArray(options) && options.map(op =>
        h(  // 有待拆解
          name == 'Radio' ? component : component[RENDER_MAP[name]],
          { ...op, key: op.value },
          op.label
        )
      ))}
  </Form.Item>
}



const RowWraper = (props: any) => {
  return <Row>
    {props.row.map((cols: any) => {
      const { col, prop } = cols
      return <Col {...col} key={prop} span={col && col.span || 24}>
        <FormEle {...cols} />
      </Col>
    })}
  </Row>
}

const formatFormInit = (data) => {
  return data.reduce((cur, next) => {
    const { prop, defaultVal } = next
    cur[prop] = defaultVal || ''
    return cur
  }, {})
}


const AntdFormMaker = (props: IProps, ref) => {
  const [form] = Form.useForm()
  const { columns, formAttrs } = props
  const [rowGroups, setRowGroups] = useState<any[]>([])
  // const [formInit, setFormInit] = useState<any>({})

  useEffect(() => {
    setRowGroups(groupBy(columns, 'rowId'))
  }, [columns])

  useImperativeHandle(ref, () => ({
    ...form,
  }), [props])

  useEffect(() => {
    form.setFieldsValue(formatFormInit(columns))
  }, [columns])


  return <Form
    {...formAttrs}
    form={form}
  // initialValues={formInit} 
  >
    {Object.values(rowGroups).map((row: any, index: number) => <RowWraper key={index} row={row} />)}
  </Form>
}

export default forwardRef(AntdFormMaker)