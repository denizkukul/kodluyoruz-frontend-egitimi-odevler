# Kodluyoruz React Temel Ödev-5

# buttonpack

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/buttonpack.svg)](https://www.npmjs.com/package/buttonpack) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save buttonpack
```

## Usage
```jsx
import React from 'react'

import { Button } from 'buttonpack'
import 'buttonpack/dist/index.css'

const example = () => {
  return <div>
    <Button>default button</Button>
    <Button type="primary">primary button</Button>
    <Button type="dashed">dashed button</Button>
    <Button type="text">text button</Button>
    <Button type="link">link button</Button>
  </div>
}
```
![](screenshot.png)
