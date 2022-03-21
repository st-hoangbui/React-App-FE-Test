import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Container from 'react-bootstrap/Container';
import { getBlogs } from '../redux-toolkit/blogsSlice';
import SearchPage from '../component/SearchPage';
import Blogs from '../component/Blogs';
import Pagination from '../component/Pagination';
import SortDropdown from '../component/SortPage';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Col, Row } from 'react-bootstrap';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const blogsPerPage = 10;
  const indexOfLastPost = currentPage * blogsPerPage;
  const indexOfFirstPost = indexOfLastPost - blogsPerPage;
  const currentBlogs = blogs
    .filter(val => {
      if (searchTerm === '') {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
      return null;
    })
    .sort((a, b) => {
      if (typeFilter !== '') {
        if (a[typeFilter].toLowerCase() < b[typeFilter].toLowerCase()) {
          return -1;
        }
        if (a[typeFilter].toLowerCase() > b[typeFilter].toLowerCase()) {
          return 1;
        }
        return 0;
      }
      return 0;
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNum => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  const debounceFuncSearch = debounce(value => {
    setSearchTerm(value);
    history.push({
      pathname: '/blogs',
      search: `?search=${value}`
    });
  }, 500);

  const handleSelect = value => {
    setTypeFilter(value);
    history.push({
      pathname: '/blogs',
      search: `?sortBy=${value}`
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    try {
      var callApi = async () => {
        const actionResult = await dispatch(getBlogs('blogs'));
        const unwrapCurrentBlogs = unwrapResult(actionResult);
        setBlogs(unwrapCurrentBlogs);
        setLoading(false);
      };
    } catch (error) {
      console.log(error.massage);
    }
    callApi();
  }, []);
  return (
    <>
      <Container fluid>
        <h1 className="my-5 text-primary text-center">React List Blogs</h1>
        <Row className="justify-content-md-center">
          <Col>
            <SortDropdown handleSelect={handleSelect} typeFilter={typeFilter} />
          </Col>
          <Col>
            <SearchPage searchText={debounceFuncSearch} />
          </Col>
        </Row>
        <Blogs blogs={currentBlogs} loading={loading} />
        <Pagination
          blogsPerPage={blogsPerPage}
          totalBlogs={blogs.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
          history={history}
        />
      </Container>
    </>
  );
}
