const { InstanceBase, Regex, runEntrypoint, InstanceStatus, UDPHelper } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const getPresets = require('./presets')

class EC90ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		await this.configUpdated(config) // from index.js

		this.updateStatus(InstanceStatus.Ok)

		this.setPresetDefinitions(getPresets())

		this.updateActions() // export actions
	}

	async destroy() {
		this.log('debug', 'destroy')
		if (this.socket) {
			this.socket.destroy()
		} else if (this.udp) {
			this.udp.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	async configUpdated(config) {
		this.log('debug', 'config was updated')
		if (this.udp) {
			this.udp.destroy()
			delete this.udp
		}

		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.config = config

		this.init_udp()

		this.setVariableDefinitions([])
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
		]
	}

	init_udp() {
		if (this.udp) {
			this.udp.destroy()
			delete this.udp
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.udp = new UDPHelper(this.config.host, 61215)

			this.udp.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				this.log('error', 'Network error: ' + err.message)
			})

			// If we get data, thing should be good
			this.udp.on('listening', () => {
				this.updateStatus(InstanceStatus.Ok)
				this.log('debug', 'We are getting data!')
			})

			this.udp.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	updateActions() {
		UpdateActions(this)
	}

}

runEntrypoint(EC90ModuleInstance, UpgradeScripts)
