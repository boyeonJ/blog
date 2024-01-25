import React from 'react'
import 'prismjs/themes/prism.css';
import Layout from './src/components/layout'

export const wrapPageElement = ({
    element
}: {
    element: React.ReactNode
}): React.ReactNode => {
    return (<Layout>{element}</Layout>)
}
