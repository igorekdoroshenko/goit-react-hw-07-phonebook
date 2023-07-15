// import React from 'react';
// import PropTypes from 'prop-types';
// import { FilterWrapper, FilterLabel, FilterInput } from './Filter.style';
// import { useSelector, useDispatch } from 'react-redux';
// import { setFilter } from 'redux/filterSlice';

// // export default function Filter ({ value, onChangeFilter }) {
// //   return (
// //     <FilterWrapper>
// //       <FilterLabel>
// //         Find contacts by name
// //         <FilterInput type="text" value={value} onChange={onChangeFilter} />
// //       </FilterLabel>
// //     </FilterWrapper>
// //   );
// // }

// // Filter.propTypes = {
// //   value: PropTypes.string.isRequired,
// //   onChangeFilter: PropTypes.func.isRequired,
// // };
 
// export const Filter = () => {
//   const dispatch = useDispatch();

//   const filter = useSelector(state => state.filter.filter);

//   const changeFilter = e => {
//     dispatch(setFilter(e.currentTarget.value));
//   };

//   return (
//     <FilterWrapper>
//       <FilterLabel>
//         Find contacts by name
//         <FilterInput type="text" value={filter} onChange={changeFilter} />
//       </FilterLabel>
//     </FilterWrapper>
//   );
// };
import { FilterWrapper, FilterLabel, FilterInput } from './Filter.style';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';


const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

    const changeFilter = e => {
    const normalizedValue = e.target.value.toLowerCase();

    dispatch(setFilter(normalizedValue));
  };

  return (
    <FilterWrapper>
      <FilterLabel>
        Find contacts by name
        <FilterInput type="text" value={value} onChange={changeFilter} />
      </FilterLabel>
    </FilterWrapper>
  );
};

export default Filter;

