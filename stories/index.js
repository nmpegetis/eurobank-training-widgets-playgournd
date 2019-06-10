import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => {
			const style = {
				backgroundColor: '#FFF',
				border: '1px solid purple',
				borderRadius: 2,
				outline: 0,
				fontSize: 15,
				cursor: 'pointer',
			};
			const name = text('Name', 'Click me!');

			return (
				<button
					disabled={boolean('Disabled', false)}
					style={object('style', style)}
					onClick={action('clicked')}
				>
					{name}
				</button>
			);
		},
		{ notes: 'A very simple button component' }
	)
	.add('with emoji', () => (
		<button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</button>
	));
