import React, {useState} from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'

import {useAppDispatch} from '../../../common/hooks/useAppDispatch'
import {packsThunks} from '../../packs/packs.slice'
import {CustomModal} from '../CustomModal'
import styles from '../customModal.module.css'

export const AddNewPackModal: React.FC<AddNewPackModalPropsType> = ({
    isModalOpen,
    setIsModalOpen,
    addPack
}) => {
    const [packName, setPackName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [image, setImage] = useState('')

    const dispatch = useAppDispatch()

    const addCardPack = (): void => {
        addPack(packName)
    }

    return (
        <CustomModal
            modalTitle="Add new pack"
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCardPack}
            buttonTitle="Save"
        >
            {image && (
                <>
                    <div className={styles.text}>Cover</div>
                    <div className={styles.imageContainer}>
                        <img src={image} alt="packImage" className={styles.image} />
                    </div>
                </>
            )}
            <Input
                value={packName}
                placeholder="Name pack"
                onChange={e => setPackName(e.currentTarget.value)}
                fullWidth
                style={{marginBottom: '20px'}}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isPrivate}
                        onChange={e => setIsPrivate(e.currentTarget.checked)}
                    />
                }
                label="Private pack"
            />
        </CustomModal>
    )
}

type AddNewPackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    addPack: (name:string) => void
}
