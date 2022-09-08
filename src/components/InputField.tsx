import { Ref, forwardRef } from 'react'
import { Input } from '../states/type'

export const InputField = forwardRef((props: Input, ref: Ref<HTMLInputElement>) => {
    const { type, placeholder } = props
    return (
        <input
            type={type}
            ref={ref}
            placeholder={placeholder}
            className='border border-gray-300 text-gray-900 text-sm pl-2 rounded-lg w-full h-8'
        />
    )
})