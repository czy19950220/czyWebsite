<script>
  import {check} from '../utils/auth'
  export default {
    name: "authorized",
    functional: true,
    props:{
      authority: {
        type: Array,
        required: true
      }
    },
    render(h, context) {
      const {props, scopedSlots} = context;
      return check(props.authority) ? scopedSlots.default() :null
    }
  }
</script>
