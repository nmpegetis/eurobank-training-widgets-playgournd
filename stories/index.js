import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, date, text, boolean, select } from '@storybook/addon-knobs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => {
			const name = text('Name', 'Click me!');
			const colors = {
				primary: 'primary',
				secondary: 'secondary',
			};
			const color = select('Color', colors, colors.primary);

			return (
				<Button
					disabled={boolean('Disabled', false)}
					variant="contained"
					color={color}
					onClick={action('clicked')}
				>
					{name}
				</Button>
			);
		},
		{ notes: 'A very simple button component' }
	)
	.add('with emoji', () => (
		<Button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</Button>
	));

storiesOf('Field', module).addDecorator(withKnobs).add('TextField', () => {
	const name = text('Name', 'Label');
	let value = text('Value', 'Cat in the Hat');
	const handleChange = (e) => console.log('e', e.target.value);
	return (
		<TextField
			id="standard-name"
			label={name}
			disabled={boolean('Disabled', false)}
			value={value}
			onChange={action('TextField changed')}
			margin="normal"
		/>
	);
}, { notes: 'A very simple textField component' });

storiesOf('Select', module).addDecorator(withKnobs).add('SelectField', () => {
	const name = text('Label', 'Age');
	const items = { None: '', Ten: 10, Twenty: 20, Thirty: 30 };
	const value = select('Value', items, '');

	const renderMenuItems = () => Object.keys(items).map((key) => <MenuItem value={items[key]}>{key}</MenuItem>);

	return (
		<FormControl>
			<InputLabel htmlFor="age-simple">{name}</InputLabel>
			<Select
				disabled={boolean('Disabled', false)}
				value={value}
				onChange={action('SelectField changed')}
				style={{ width: '150px' }}
			>
				{renderMenuItems()}
			</Select>
		</FormControl>
	);
}, { notes: 'A very simple selectField component' });

storiesOf('Pickers', module).addDecorator(withKnobs).add('Date', () => {
	const name = text('Label', 'Date');
	let selectedDate = date('Date', new Date('2014-08-18T21:11:54'));

	const handleDateChange = (date) => {
		selectedDate = new Date(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid
				container
				style={{
					grid: {
						width: '60%',
					},
				}}
			>
				<KeyboardDatePicker
					margin="normal"
					label={name}
					value={selectedDate}
					onChange={handleDateChange}
					disabled={boolean('Disabled', false)}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}, { notes: 'A very simple DatePicker component' });

storiesOf('Board', module).addDecorator(withKnobs).add('Table', () => {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="javascript:;">{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (tags) => (
				<span>
					{tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</span>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<a href="javascript:;">Invite {record.name}</a>
					<Divider type="vertical" />
					<a href="javascript:;">Delete</a>
				</span>
			),
		},
	];

	const data = [
		{
			key: '1',

			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: [ 'nice', 'developer' ],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: [ 'loser' ],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: [ 'cool', 'teacher' ],
		},
	];

	return data && <Table columns={columns} dataSource={data} />;
}, { notes: 'A very simple Table component' });
