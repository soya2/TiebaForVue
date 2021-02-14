import Vue from 'vue'
import {
  Backtop,
  Button,
  Card,
  Col,
  Collapse,
  CollapseItem,
  Container,
  Header,
  Input,
  Loading,
  Main,
  Message,
  Pagination,
  Row,
  Slider,
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
Vue.use(Slider)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.prototype.$message = Message
