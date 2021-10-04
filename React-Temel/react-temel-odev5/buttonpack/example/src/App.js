import React from 'react'

import { Button } from 'buttonpack'
import 'buttonpack/dist/index.css'

const App = () => {
  return <div>
    <Button>default button</Button>
    <Button type="primary">primary button</Button>
    <Button type="dashed">dashed button</Button>
    <Button type="text">text button</Button>
    <Button type="link">link button</Button>
  </div>
}

export default App
