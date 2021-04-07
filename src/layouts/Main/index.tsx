import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHospitalUser, faLock } from '@fortawesome/free-solid-svg-icons';

// Components
import GridContainer from '@components/GridContainer';
import GridItem from '@components/GridItem';
import Sidebar from '@components/Sidebar';

// Styles
import './index.scss';

const menuItems = [
  {
    title: 'Home',
    href: '/',
    icon: <FontAwesomeIcon icon={faHome} />,
    active: true
  },
  {
    title: 'Pacientes',
    href: '/patient',
    icon: <FontAwesomeIcon icon={faHospitalUser} />,
    active: false
  },
  {
    title: 'Bloqueados',
    href: '/blocked',
    icon: <FontAwesomeIcon icon={faLock} />,
    active: false
  }
];

const MainLayout = (props: any) => {
  return (
    <div className="main-layout">
      <GridContainer gridGap={0} style={{ padding: 0 }}>
        <GridItem colSpan={2}>
          <Sidebar menuItems={menuItems} />
        </GridItem>
        <GridItem colSpan={10} style={{ padding: 0 }}>
          <section className="main-layout__content">
            {props.children}
          </section>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default MainLayout;
