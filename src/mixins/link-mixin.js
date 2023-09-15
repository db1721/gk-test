export default {
    methods: {
        detectYoutubeLinks (links) {
            if (! links || links.length == 0) {
                return []
            }

            const youtubeRegExpressionLink = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            return links.filter(link => {
                return link.match(youtubeRegExpressionLink)
            })
        }
    }
}