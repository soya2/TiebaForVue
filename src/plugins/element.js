import Vue from 'vue'
import {
  Backtop,
  Button,
  Card,
  Col,
  Container,
  Header,
  Loading,
  Main,
  Message,
  Pagination,
  Row,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Backtop)
Vue.use(Loading)

Vue.prototype.$message = Message
