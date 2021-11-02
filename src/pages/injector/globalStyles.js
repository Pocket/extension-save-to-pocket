import { css } from 'linaria'

export const globalReset = css`
  // additional class here for when we need more
  // specificity to override page styles, but also
  // so we don't have to duplicate overrides to both
  // light & dark theme classes
  &.pocket-extension,
  .pocket-extension {
    *:after,
    *:before {
      all: unset;
    }
  }
`

export const globalVariables = css`
  :global() {
    .pocket-theme-light {
      --color-canvas: #FFFFFF;
      --color-textPrimary: #1A1A1A;
      --color-textSecondary: #666666;
      --color-actionPrimary: #008078;
      --color-actionPrimaryHover: #004D48;
      --color-actionPrimarySubdued: #E8F7F6;
      --color-actionPrimaryText: #FFFFFF;
      --color-actionSecondary: #1A1A1A;
      --color-actionSecondaryHover: #1A1A1A;
      --color-actionSecondaryHoverText: #F2F2F2;
      --color-actionSecondaryText: #1A1A1A;
      --color-actionBrand: #EF4056;
      --color-actionFocus: #009990;
      --color-formFieldFocusLabel: #008078;
      --color-formFieldBorder: #8C8C8C;
      --color-formFieldBorderHover: #333333;
      --color-error: #B24000;
      --color-dividerPrimary: #333333;
      --color-dividerTertiary: #D9D9D9;
      --color-calloutBackgroundPrimary: #E8F7F6;
      --color-inlineButton: #008078;
      --color-inlineButtonHover: #008078;
      --color-headingBackground: #E8F7F6;
      --color-headingErrorBackground: #FDF2F5;
      --color-headingIcon: #EF4056;
      --color-chipsBackground: #E8F7F6;
      --color-chipsText: #004D48;
      --color-chipsActive: #1A1A1A;
      --color-taggingBorder: #D9D9D9;
      --color-taggingShadow: rgba(0, 0, 0, 0.25);
      --color-itemPreviewBackground: #F2F2F2;
    }

    .pocket-theme-dark {
      --color-canvas: #1A1A1A;
      --color-textPrimary: #F2F2F2;
      --color-textSecondary: #8C8C8C;
      --color-actionPrimary: #008078;
      --color-actionPrimaryHover: #004D48;
      --color-actionPrimarySubdued: #00403C;
      --color-actionPrimaryText: #FFFFFF;
      --color-actionSecondary: #F2F2F2;
      --color-actionSecondaryHover: #F2F2F2;
      --color-actionSecondaryHoverText: #1A1A1A;
      --color-actionSecondaryText: #F2F2F2;
      --color-actionBrand: #EF4056;
      --color-actionFocus: #00CCC0;
      --color-formFieldFocusLabel: #00A69C;
      --color-formFieldBorder: #737373;
      --color-formFieldBorderHover: #CCCCCC;
      --color-error: #E55300;
      --color-dividerPrimary: #CCCCCC;
      --color-dividerTertiary: #404040;
      --color-calloutBackgroundPrimary: #004D48;
      --color-inlineButton: #E8F7F6;
      --color-inlineButtonHover: #E8F7F6;
      --color-headingBackground: #404040;
      --color-headingErrorBackground: #901424;
      --color-headingIcon: #FDF2F5;
      --color-chipsBackground: #004D48;
      --color-chipsText: #ffffff;
      --color-chipsActive: #ffffff;
      --color-taggingBorder: #8C8C8C;
      --color-taggingShadow: rgba(255, 255, 255, 0.25);
      --color-itemPreviewBackground: #404040;
    }

    .pocket-extension {
      --color-white100: #FFFFFF;
      --color-grey10: #1A1A1A;
      --color-grey20: #333333;
      --color-grey25: #404040;
      --color-grey30: #4D4D4D;
      --color-grey35: #595959;
      --color-grey40: #666666;
      --color-grey45: #737373;
      --color-grey55: #8C8C8C;
      --color-grey65: #A6A6A6;
      --color-grey80: #CCCCCC;
      --color-grey85: #D9D9D9;
      --color-grey95: #F2F2F2;
      --color-coral: #EF4056;
      --color-amber: #FCB643;
      --color-brandPocket: #EF4056;
      --fontSansSerif: "Graphik Web", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
    }
  }
`

export const radioStyles = css`
  input[type='radio'] + label,
  input[type='checkbox'] + label {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 12px;
  }

  input[type='radio'] {
    opacity: 0;
    margin: 0;

    & + label {
      margin: 4px 0;
      display: inline-flex;
      align-items: center;
      min-height: 24px;
      position: relative;
      padding: 0 24px;
      cursor: pointer;
      &:before,
      &:after {
        box-sizing: border-box;
        position: absolute;
        content: '';
        border-radius: 50%;
        transition: all 50ms ease;
        transition-property: transform, border-color;
      }
      // radio button border
      &:before {
        left: -12px;
        top: 0;
        width: 24px;
        height: 24px;
        border: 2px solid var(--color-formFieldBorder);
      }
      // selected radio button inner circle
      &:after {
        top: 5px;
        left: -7px;
        width: 14px;
        height: 14px;
        transform: scale(0);
        background: var(--color-actionPrimary);
      }
    }

    &:hover:enabled {
      & + label:before {
        border-color: var(--color-actionPrimaryHover);
      }
    }
    &:disabled {
      & + label {
        opacity: 0.5;
      }
      &:hover {
        & + label:before,
        & + label {
          cursor: not-allowed;
        }
      }
    }

    &:checked {
      & + label:before {
        border-color: var(--color-actionPrimary);
      }

      & + label:after {
        transform: scale(1);
      }

      &:hover:enabled,
      &:active:enabled {
        & + label:before {
          border-color: var(--color-actionPrimaryHover);
        }
        & + label:after {
          background: var(--color-actionPrimaryHover);
        }
      }
    }
    // same design element regardless of checked or hover
    &:focus {
      & + label:before {
        box-shadow: 0px 0 0 2px var(--color-canvas),
          0px 0 0 4px var(--color-formFieldFocusLabel);
      }
    }
  }
`
