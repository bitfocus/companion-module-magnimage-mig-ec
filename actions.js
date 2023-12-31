exports.getActions = function (instance) {
	let actions = {}

	// Common functions
	if (instance.config.modelID === 'ec90' || instance.config.modelID === 'ec80') {
		actions.take_fade = {
			name: 'Take Fade',
			options: [],
			callback: async (event) => {
				instance.log('debug', 'Taking Fade', event.options.num)

				const sendBuf = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x2a,
					],
					'latin1',
				)

				instance.log('debug', 'UDP status ' + (instance.udp !== undefined))

				if (instance.udp !== undefined) {
					instance.udp.send(sendBuf)

					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString()) // sendBuf.map((item) => item.toString(16)))
				}
			},
		}

		actions.take_cut = {
			name: 'Take Cut',
			options: [],
			callback: async (event) => {
				instance.log('debug', 'Taking Cut', event.options.num)

				const sendBuf = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x29,
					],
					'latin1',
				)

				if (instance.udp !== undefined) {
					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString())

					instance.udp.send(sendBuf)
				}
			},
		}

		actions.load_preset = {
			name: 'Load Preset',
			options: [
				{
					id: 'preset_number',
					type: 'dropdown',
					label: 'Load Preset Number',
					choices: [
						{ id: 0, label: '1' },
						{ id: 1, label: '2' },
						{ id: 2, label: '3' },
						{ id: 3, label: '4' },
						{ id: 4, label: '5' },
						{ id: 5, label: '6' },
						{ id: 6, label: '7' },
						{ id: 7, label: '8' },
						{ id: 8, label: '9' },
						{ id: 9, label: '10' },
						{ id: 10, label: '11' },
						{ id: 11, label: '12' },
						{ id: 12, label: '13' },
						{ id: 13, label: '14' },
						{ id: 14, label: '15' },
						{ id: 15, label: '16' },
						{ id: 16, label: '17' },
						{ id: 17, label: '18' },
						{ id: 18, label: '19' },
						{ id: 19, label: '20' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				const load_preset_prefix = [0xed, 0xcb, 0x28, 0x48, 0x01, 0x01]
				const load_preset_midfix = [
					0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
					0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
				]

				var Buff = load_preset_prefix
				Buff.push(event.options.preset_number)
				Buff = Buff.concat(load_preset_midfix)
				Buff.push(parseInt(event.options.preset_number) + 42)

				const sendBuf = Buffer.from(Buff, 'latin1')

				if (instance.udp !== undefined) {
					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString())

					instance.udp.send(sendBuf)
				}
			},
		}
	}

	// EC90 specific
	if (instance.config.modelID === 'ec90') {
		actions.freeze = {
			name: 'Freeze',
			options: [],
			callback: async (event) => {
				instance.log('debug', 'Freezing Output', event.options.num)

				const sendBuf = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x0a, 0x08, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x3b,
					],
					'latin1',
				)

				if (instance.udp !== undefined) {
					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString())

					instance.udp.send(sendBuf)
				}
			},
		}
		actions.unfreeze = {
			name: 'unFreeze',
			options: [],
			callback: async (event) => {
				instance.log('debug', 'unFreezing Output', event.options.num)

				const sendBuf = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x0a, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x3a,
					],
					'latin1',
				)

				if (instance.udp !== undefined) {
					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString())

					instance.udp.send(sendBuf)
				}
			},
		}
		actions.switch_mode = {
			name: 'Change Switch Mode',
			options: [
				{
					id: 'switch_mode',
					type: 'dropdown',
					label: 'Switch Mode',
					choices: [
						{ id: 0, label: 'Main & Aux Take' },
						{ id: 1, label: 'Main Take' },
						{ id: 2, label: 'Aux Take' },
					],
					default: '0',
				},
			],
			callback: async (event) => {
				instance.log('debug', 'Changing switch mode to ', event.options.switch_mode)

				const main_aux_take = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x1b, 0x08, 0x55, 0x55, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0xf7,
					],
					'latin1',
				)

				const main_take = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x1b, 0x08, 0x55, 0x55, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0xf6,
					],
					'latin1',
				)

				const aux_take = Buffer.from(
					[
						0xed, 0xcb, 0x28, 0x48, 0x1b, 0x08, 0x55, 0x55, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
						0x00, 0x00, 0xf6,
					],
					'latin1',
				)

				let sendBuf = []

				switch (event.options.switch_mode) {
					case 0:
						sendBuf = main_aux_take
						break
					case 1:
						sendBuf = main_take
						break
					case 2:
						sendBuf = aux_take
						break
					default:
						sendBuf = main_aux_take
				}

				if (instance.udp !== undefined) {
					instance.log('debug', 'sending to ' + instance.config.host + ': ' + sendBuf.toString())

					instance.udp.send(sendBuf)
				}
			},
		}
	}

	return actions
}
