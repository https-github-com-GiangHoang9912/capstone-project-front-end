// import React, { Fragment } from 'react';
// import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
// import { Input } from '@formily/next-components';
// import useNextFormTable from '@ahooksjs/next-form-table';
// import { Table, Pagination } from '@alifd/next';

// TableDemo.propTypes = {

// };

// const list = ({ current, pageSize, ...formData }) => {
//   let query = `page=${current}&size=${pageSize}`;

//   Object.entries(formData).forEach(([key, value]) => {
//     if (value) {
//       query += `&${key}=${value}`;
//     }
//   });

//   return window
//     .fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
//     .then((res) => res.json())
//     .then((res) => ({
//       data: {
//         total: 55,
//         dataSource: res.results,
//       },
//     }));
// };


// function TableDemo(props: any) {
//   const { formProps, tableProps, paginationProps } = useNextFormTable(list);

//   return (
//     <Fragment>
//       <SchemaForm {...formProps} components={{ Input }}
//        style={{ marginBottom: 20 }} inline>
//         <Field name="name" title="name" x-component={'Input'} />
//         <FormButtonGroup>
//           <Submit>查询</Submit>
//           <Reset>重置</Reset>
//         </FormButtonGroup>
//       </SchemaForm>

//       <Table primaryKey={'login.uuid'} {...tableProps}>
//         <Table.Column title="name" dataIndex="name.last" width={200} />
//         <Table.Column title="email" dataIndex="email" width={500} />
//         <Table.Column title="phone" dataIndex="phone" width={500} />
//         <Table.Column title="gender" dataIndex="gender" width={200} />
//       </Table>
//       <Pagination style={{ marginTop: 16 }} {...paginationProps} />
//     </Fragment>
//   );
// }

// export default TableDemo;