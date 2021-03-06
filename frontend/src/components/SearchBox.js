import React, {useState} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitSearch = (e) =>{
        e.preventDefault()

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else{
            history.push('/')
        }
    }

    return (
        <Form className='search' onSubmit={submitSearch} >
            <FormControl type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5' />
            <Button type='submit' variant='outline-success' className='p-2' >Search</Button>
        </Form>
    )
}

export default SearchBox
