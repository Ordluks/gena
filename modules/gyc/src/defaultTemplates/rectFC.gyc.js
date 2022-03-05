const stylesFile =
`.wrapper {};`

const jsxFile =
`import React from 'react'
import css from '##styles'

const ##name = () => {
	return (
		<div className={css.wrapper}></div>
	)
}

export default ##name`


const template = {
	'##name': {
		'##name.module.css ##=styles': stylesFile,
		'##name.jsx': jsxFile
	}
}