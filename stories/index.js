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
	const chooseDaysBefore = (days) =>
		((d) => new Date(d.setDate(d.getDate() - days)))(new Date()).toLocaleDateString();
	const chooseDaysAfter = (days) => ((d) => new Date(d.setDate(d.getDate() + days)))(new Date()).toLocaleDateString();

	// TODO: For use in the exercise below
	// const unit = [ 'Centralized Services & Digital Branches' ];
	// const pem = [ '10000', '10001', '10010', '10011' ];
	// const title = [ 'Lifemoments', 'PricingTool', 'LendingTool', 'WizardTool' ];
	// const desc = [ 'test', 'test2', 'test3' ];
	// const supervisor = [ 'Super1', 'Super2', 'Super3' ];
	// const team = [
	// 	[ 'Member1', 'Member2', 'Member3' ],
	// 	[ 'Member4', 'Member5', 'Member6', 'Member7' ],
	// 	[ 'Member8', 'Member9' ],
	// 	[ 'Member10' ],
	// ];
	// const startingDate = [ chooseDaysBefore(10), chooseDaysBefore(32), chooseDaysBefore(15), chooseDaysBefore(45) ];
	// const endingDate = [ chooseDaysAfter(40), chooseDaysAfter(60), chooseDaysAfter(50), chooseDaysAfter(4) ];
	// const comments = [
	// 	'nothing to mention',
	// 	'low team capacity due to holiday season',
	// 	'many experienced developers in team',
	// ];
	// const mandays = [ 100, 140, 150 ];
	// const lastUpdate = [ chooseDaysBefore(3), chooseDaysBefore(1), chooseDaysBefore(0), , chooseDaysBefore(6) ];
	// const status = [ 'Started', 'On going', 'Finishing' ];

	// const projectStatusData = () => ({
	// 	unit: unit[Math.floor(Math.random() * unit.length)],
	// 	pem: pem[Math.floor(Math.random() * pem.length)],
	// 	title: title[Math.floor(Math.random() * title.length)],
	// 	desc: desc[Math.floor(Math.random() * desc.length)],
	// 	supervisor: supervisor[Math.floor(Math.random() * supervisor.length)],
	// 	team: team[Math.floor(Math.random() * team.length)],
	// 	startingDate: startingDate[Math.floor(Math.random() * startingDate.length)],
	// 	endingDate: endingDate[Math.floor(Math.random() * endingDate.length)],
	// 	comments: comments[Math.floor(Math.random() * comments.length)],
	// 	mandays: mandays[Math.floor(Math.random() * mandays.length)],
	// 	lastUpdate: lastUpdate[Math.floor(Math.random() * lastUpdate.length)],
	// 	status: status[Math.floor(Math.random() * status.length)],
	// });

	// TODO: Create an array of four(4) elements filled in with projectStatusData
	// const data = ...

	// TODO: Create an array of columns using projectStatusData
	// const columns = ...

	const data = [
		{
			unit: 'Centralized Services & Digital Branches',
			pem: '10001',
			title: 'Lifemoments',
			desc: 'test2',
			supervisor: 'Super3',
			team: [ 'Member1', 'Member2', 'Member3' ],
			startingDate: chooseDaysBefore(30),
			endingDate: chooseDaysAfter(10),
			comments: 'many experienced developers in team',
			mandays: 140,
			lastUpdate: chooseDaysBefore(0),
			status: 'On going',
		},
	];

	const columns = [
		{
			title: 'UNIT',
			dataIndex: 'unit',
			key: 'unit',
			render: (text) => <a href="javascript:;">{text}</a>,
		},
		{
			title: 'PEM',
			dataIndex: 'pem',
			key: 'pem',
		},
		{
			title: 'TITLE',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'SUPERVISOR',
			key: 'supervisor',
			dataIndex: 'supervisor',
		},
		{
			title: 'TEAM',
			key: 'team',
			dataIndex: 'team',
			render: (tags) => (
				<span>
					{tags.map((tag) => {
						console.log('tags', tag);
						return <Tag key={tag}>{tag}</Tag>;
					})}
				</span>
			),
		},
		{
			title: 'STARTINGDATE',
			key: 'startingDate',
			dataIndex: 'startingDate',
		},
		{
			title: 'ENDINGDATE',
			key: 'endingDate',
			dataIndex: 'endingDate',
		},
		{
			title: 'COMMENTS',
			key: 'comments',
			dataIndex: 'comments',
		},
		{
			title: 'MANDAYS',
			key: 'mandays',
			dataIndex: 'mandays',
		},
		{
			title: 'LASTUPDATE',
			key: 'lastUpdate',
			dataIndex: 'lastUpdate',
		},
		{
			title: 'STATUS',
			key: 'status',
			dataIndex: 'status',
			render: (tag) => (
				<Tag color={'geekblue'} key={tag}>
					{tag.toUpperCase()}
				</Tag>
			),
		},
	];

	return data && <Table columns={columns} dataSource={data} />;
}, { notes: 'A very simple Table component' });
