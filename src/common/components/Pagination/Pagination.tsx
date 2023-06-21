import React, {ChangeEvent, ReactElement, useEffect} from 'react'

import {Pagination as PaginationMUI} from '@mui/material'
import {useSearchParams} from 'react-router-dom'

import {useAppSelector} from '../../hooks/useAppSelector'

import styles from './pagination.module.css'

// eslint-disable-next-line no-magic-numbers
const arr = [5, 10, 20, 50]

export const Pagination = React.memo(
    ({page, pageCount, totalCount, changePagination}: PaginationType): ReactElement => {
        const status = useAppSelector(state => state.app.isLoading)

        const [searchParams, setSearchParams] = useSearchParams()

        const numberOfPages = Math.ceil(totalCount / pageCount)

        const onChangePage = (event: React.ChangeEvent<unknown>, page: number): void => {
            searchParams.set('page', `${page}`)
            setSearchParams(searchParams)
            changePagination(page, pageCount)
        }

        const onChangeSizePageHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
            searchParams.set('pageCount', `${Number(e.currentTarget.value)}`)
            setSearchParams(searchParams)
        }

        useEffect(() => {
            changePagination(page, pageCount)
        }, [changePagination, page, pageCount])

        return (
            <div className={styles.pagination}>
                <PaginationMUI
                    page={page}
                    count={numberOfPages}
                    color="primary"
                    style={{display: 'inline-block'}}
                    disabled={status}
                    onChange={onChangePage}
                />
                Show
                <select
                    onChange={onChangeSizePageHandler}
                    value={pageCount}
                    disabled={status}
                >
                    {arr.map(el => (
                        <option key={el} value={el}>
                            {el}
                        </option>
                    ))}
                </select>
                Cards per Page
            </div>
        )
    },
)

// Types
type PaginationType = {
    page: number
    pageCount: number
    totalCount: number
    changePagination: (age: number, pageCount: number) => void
}
