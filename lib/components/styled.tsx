import { styled } from 'styled-components';
import { IoShareOutline } from 'react-icons/io5';
import { FaRegSquarePlus } from 'react-icons/fa6';

type PromptCopyProps = {
  $bold?: boolean;
};

type VisibleElementProps = {
  $isVisible?: boolean;
  transitionDuration?: number;
};

export const PromptOverlay = styled.div<VisibleElementProps>`
  background-color: rgba(10, 10, 10, 0.5);
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  left: 0;
  min-height: -webkit-fill-available;
  min-height: 100vh;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  position: fixed;
  top: 0;
  transition: opacity
    ${({ transitionDuration }) =>
      transitionDuration ? `${transitionDuration / 2}ms` : '0.2s'}
    ease-in;
  width: 100vw;
  z-index: 999999;

  ${({ $isVisible = false }) =>
    !$isVisible &&
    `
    pointer-events: none;
    touch-action: none;
    `}
`;

export const PromptWrapper = styled.div<VisibleElementProps>`
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  bottom: 0;
  color: black;
  filter: brightness(1.1);
  left: 0;
  margin: 0 8px 10px;
  overflow: hidden;
  position: fixed;
  transform: translateY(calc(100% + 10px));
  transition: transform
    ${({ transitionDuration }) =>
      transitionDuration ? `${transitionDuration}ms` : '0.4s'}
    cubic-bezier(0.4, 0.24, 0.3, 1);
  width: calc(100vw - 16px);
  z-index: 999999;

  @media (prefers-color-scheme: dark) {
    & {
      background: rgba(10, 10, 10, 0.5);
      color: rgba(235, 235, 245, 0.6);
    }
  }

  ${({ $isVisible = false }) =>
    $isVisible &&
    `
    transform: translateY(0);
    display: block;
    `}
`;

export const PromptHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(60, 60, 67, 0.29);
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  border-width: 0.5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 13px 16px;

  @media (prefers-color-scheme: dark) {
    & {
      border-color: rgba(140, 140, 140, 0.7);
    }
  }
`;

export const PromptTitle = styled.p`
  color: black;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.125;
  margin: 0;
  padding: 0;

  @media (prefers-color-scheme: dark) {
    & {
      color: white;
    }
  }
`;

export const PromptCancelButton = styled.button`
  background: transparent;
  border: 0;
  color: rgba(0, 85, 179, 1);
  font-size: 16px;
  margin: 0;
  padding: 0;

  @media (prefers-color-scheme: dark) {
    & {
      color: rgba(9, 132, 255, 1);
    }
  }
`;

export const PromptBody = styled.div`
  display: flex;
  width: 100%;
`;

export const PromptDescription = styled.div`
  border-bottom: 1px solid rgba(60, 60, 67, 0.29);
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  border-width: 0.5px;
  color: inherit;
  margin: 0 16px;
  padding: 16px;
  text-align: left;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    & {
      border-color: rgba(140, 140, 140, 0.7);
    }
  }
`;

export const PromptShareIcon = styled(IoShareOutline).attrs({
  viewBox: '55 0 512 512',
})`
  color: rgba(0, 85, 179, 1);
  height: 44px;
  margin-right: 15px;
  width: 44px;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    & {
      color: rgba(9, 132, 255, 1);
    }
  }
`;

export const PromptAddToHomeIcon = styled(FaRegSquarePlus)`
  color: black;
  height: 34px;
  margin-right: 25px;
  width: 34px;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    & {
      color: white;
    }
  }
`;

export const PromptCopy = styled.p<PromptCopyProps>`
  color: black;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 13px;
  line-height: 17px;
  margin: 0;
  padding: 0;

  ${({ $bold = false }) =>
    $bold &&
    `
  font-weight: 600;
  `}

  @media (prefers-color-scheme: dark) {
    & {
      border-color: rgba(235, 235, 245, 0.6);
      color: rgba(235, 235, 245, 0.6);
    }
  }
`;

export const PromptInstructions = styled.div`
  color: inherit;
  margin: 0 16px;
  padding: 16px;
`;

export const PromptInstructionStep = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
