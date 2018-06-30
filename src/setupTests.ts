import { configure } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
