# React Horizontal Scroll Modal
![demo](./demo.gif)

## Usage
```
<HorizontalScrollModal
  visible={showModal}
  closeNode={<button onClick={() => setShowModal(false)}>Close</button>}>
  {children}
</HorizontalScrollModal>
```

## Props

| Prop | type | Is Must | Description |
|------|-----| --------| ------------|
| visible | boolean | yes | control modal visible |
| wrapperClassName | string | no | wrapper class name |
| closeNode | ReactNode | no | close component |
| closeIcon | string | no | img url |
| onClose | Function | no | cooperate with closeIcon |