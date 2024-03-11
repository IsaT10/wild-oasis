import styled from 'styled-components';
import MainNav from './MainNav';
import Logo from './Logo';

const SidebarStyled = styled.header`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
      <Logo />
      <MainNav />
    </SidebarStyled>
  );
};

export default Sidebar;
