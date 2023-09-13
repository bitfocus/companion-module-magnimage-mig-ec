const {combineRgb} = require('@companion-module/base')

module.exports = function getPresets() {
	const presets = {}

	presets['Take_Cut'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Take Cut',
		style: {
			text: 'Take\nCut',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'take_cut',
						options: {
							// options values to use
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['Take_Fade'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Take Fade',
		style: {
			text: 'Take\nFade',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'take_fade',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['Freeze'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Freeze',
		style: {
			text: 'Freeze',
			size: '14pt',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'freeze',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['unFreeze'] = {
		type: 'button',
		category: 'Show Control',
		name: 'unFreeze',
		style: {
			text: 'unFreeze',
			size: '14pt',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'unfreeze',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['Main_Aux_Switch_Mode'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Main & Aux Take Switch Mode',
		style: {
			text: 'Main & Aux Take',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'switch_mode',
						options: {
							switch_mode: 0,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['Main_Switch_Mode'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Main Take Switch Mode',
		style: {
			text: 'Main Take',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'switch_mode',
						options: {
							switch_mode: 1,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['Aux_Switch_Mode'] = {
		type: 'button',
		category: 'Show Control',
		name: 'Aux Take Switch Mode',
		style: {
			text: 'Aux Take',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'switch_mode',
						options: {
							switch_mode: 2,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	for (var i = 1; i < 21; i++) {
		presets['load_preset_' + i] = {
			type: 'button',
			category: 'Presets',
			name: 'Load Preset ' + i,
			style: {
				text: i.toString(),
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'load_preset',
							options: {
								preset_number: i - 1,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	return presets
}
