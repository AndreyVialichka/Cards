import React from 'react'

import {IconProp} from '@fortawesome/fontawesome-svg-core'

import styles from './customIconButton.module.scss'

type PropsType = {
    iconName: IconProp
    disabled?: boolean
    callback: () => void
}

export const CustomIconButton: React.FC<PropsType> = ({callback, disabled, iconName}) => {
    return (
        <button
            type="button"
            className={styles.btn}
            onClick={callback}
            disabled={disabled}
        >
        </button>
    )
}
