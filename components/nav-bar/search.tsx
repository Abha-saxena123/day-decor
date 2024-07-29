import { Input, Popover } from 'antd';
import axios from 'axios';
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useMemo, useState } from 'react';
import { SearchTile } from './search-tile';
import { debounce } from 'lodash';
import styled from 'styled-components';

const formatData = (data: any) => {
    return data.hits.map(({ title, rating, slug, productImage }: any) => {
        return {
            title, rating, slug,
            image: "http://localhost:1337" + productImage[0].formats.small.url
        }
    })
}

export const SearchComponent = () => {
    const [searchData, setSearchData] = useState([]);
    const handleSearch = async (e: any) => {
        if (!e.target.value || e.target.value.length < 2) {
            setSearchData([]);
            return
        };
        const controller = new AbortController();
        try {
            const response = await axios.get('http://localhost:7700/indexes/product/search', {
                signal: controller.signal,
                params: { q: e.target?.value, limit: 10 },
                headers: { authorization: 'Bearer dmMhR6904nZ0Iv8Pvx4dJ2yA6yN9eT0VWX8fPyqwcdE' }
            });
            setSearchData(formatData(response.data))
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const onChange = (e: any) => {
        debounce(handleSearch, 500)(e);
    }

    return <Popover content={content(searchData)} title="" trigger="click" arrow={false}>
        <SearchInput prefix={<SearchOutlined />} placeholder="input search text" onChange={onChange} />
    </Popover>
}

const content = (searchData: any) => {
    return <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "380px", maxHeight: "300px", overflowY: "auto" }}>{
        searchData.map((searchData1: any) => {
            return <SearchTile title={searchData1.title} image={searchData1.image} rating={searchData1.rating} />
        })
    }</div>
};


const SearchInput = styled(Input)`
width: 400px; 
margin-top: 0px;
@media (max-width: 768px) {
   width: 100%; 
margin-top: 8px;
  }

`