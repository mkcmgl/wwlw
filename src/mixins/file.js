import axios from '~/plugins/axios';

const save = (data, name) => {

    const href = URL.createObjectURL(data);

    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('download', name);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(href);
};

export default {

    data() {
        return {
            downloading: false,
        };
    },

    methods: {
        downloadFile({ txHash, fileName }) {
            this.downloading = true;

            let url = `/gateway/proof/file/download?txHash=${txHash}`;

            if (this.file.encryptMode == 2) {
                url += '&channelId=' + this.file.channelId;
            }

            axios.get(
                url,
                {
                    responseType: 'blob'
                }
            )
                .then(({ data }) => {
                    save(data, fileName);
                })
                .finally(() => {
                    this.downloading = false;
                });
        }
    }
}