# Switch

## Props
|`参数`|说明|类型|
|------------------|-----------|-----------|
|`size`|按钮大小|Number|
|`checked`|指定当前是否选中状态|Boolean|
|`checkedChildren`|选中时提示内容|String or Node|
|`unCheckedChildren`|非选中时提示内容|String or Node|
|`onClick`|点击时回调|Function|
|`onChange`|checked改变时回调|Function|

## Example
``` jsx harmony
<Switch
  size={40}
  checked
  disabled
  checkedChildren="开"
  unCheckedChildren="关"
  onClick={() => {
    console.log('改变与否，我都会触发哦')
  }}
  onChange={() => {
    console.log('只当改变时，我才会触发哦')
  }}
/>
```
