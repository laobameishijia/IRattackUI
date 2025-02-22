export const SampleService = {
    getSamplesData() {
        return [
            {
                taskid: '1',
                samples: [
                    { id: '1', iteration: '3', timestamp: '', advconfidence: '' },
                    { id: '2', iteration: '7', timestamp: '', advconfidence: '' },
                    { id: '3', iteration: '16', timestamp: '', advconfidence: '' },
                    { id: '4', iteration: '48', timestamp: '', advconfidence: '' }
                ]
            },
            {
                taskid: '2',
                samples: [
                    { id: '1', iteration: '3', timestamp: '', advconfidence: '' },
                    { id: '2', iteration: '7', timestamp: '', advconfidence: '' },
                    { id: '3', iteration: '16', timestamp: '', advconfidence: '' },
                    { id: '4', iteration: '48', timestamp: '', advconfidence: '' }
                ]
            }
        ];
    },
    
    getSamples(taskid) {
        const task = this.getSamplesData().find(t => t.taskid === taskid);
        return Promise.resolve(task ? task.samples : []);
    }
};
