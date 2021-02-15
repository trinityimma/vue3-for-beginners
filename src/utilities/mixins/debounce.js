export default {
    data() {
        return {
            timeout: "",
        };
    },
    methods: {
        debounce(func, wait = 1000) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(func,wait);
        },
    }
}  