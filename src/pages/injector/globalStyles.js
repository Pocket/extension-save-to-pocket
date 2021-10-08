 import { css } from 'linaria'

 export const GlobalVariables = css`
   :global() {
     .pocket-theme-light {
       --color-canvas: #FFFFFF;
       --color-textPrimary: #1A1A1A;
       --color-textSecondary: #666666;
       --color-textTertiary: #8C8C8C;
       --color-textLinkHover: #008078;
       --color-textLinkPressed: #004D48;
       --color-textAccent: #3668FF;
       --color-actionPrimary: #008078;
       --color-actionPrimaryHover: #004D48;
       --color-actionPrimarySubdued: #E8F7F6;
       --color-actionPrimaryText: #FFFFFF;
       --color-actionSecondary: #1A1A1A;
       --color-actionSecondaryHover: #1A1A1A;
       --color-actionSecondaryHoverText: #F2F2F2;
       --color-actionSecondaryText: #1A1A1A;
       --color-actionBrand: #EF4056;
       --color-actionBrandHover: #901424;
       --color-actionBrandSubdued: #FDF2F5;
       --color-actionBrandText: #FFFFFF;
       --color-actionFocus: #009990;
       --color-toggleOff: #737373;
       --color-toggleOffHover: #404040;
       --color-formFieldFocusLabel: #008078;
       --color-formFieldTextPrimary: #1A1A1A;
       --color-formFieldTextSecondary: #666666;
       --color-formFieldBorder: #8C8C8C;
       --color-formFieldBorderHover: #333333;
       --color-error: #B24000;
       --color-popoverCanvas: #FFFFFF;
       --color-popoverBorder: #D9D9D9;
       --color-menuItemHover: #008078;
       --color-menuItemHoverText: #FFFFFF;
       --color-menuItemActive: #004D48;
       --color-navCurrentTab: #E0F0EF;
       --color-navCurrentTabText: #008078;
       --color-tooltipCanvas: #1A1A1A;
       --color-tooltipText: #F2F2F2;
       --color-dividerPrimary: #333333;
       --color-dividerSecondary: #8C8C8C;
       --color-dividerTertiary: #D9D9D9;
       --color-drawerCanvas: #FFFFFF;
       --color-calloutBackgroundPrimary: #E8F7F6;
       --color-calloutBackgroundSecondary: #FDF2F5;
       --color-calloutAccent: #1A1A1A;

       --color-inlineButton: #008078;
       --color-inlineButtonHover: #008078;
     }
 
     .pocket-theme-dark {
       --color-canvas: #1A1A1A;
       --color-textPrimary: #F2F2F2;
       --color-textSecondary: #8C8C8C;
       --color-textTertiary: #737373;
       --color-textLinkHover: #00A69C;
       --color-textLinkPressed: #00D9CC;
       --color-textAccent: #95D2FF;
       --color-actionPrimary: #008078;
       --color-actionPrimaryHover: #004D48;
       --color-actionPrimarySubdued: #00403C;
       --color-actionPrimaryText: #FFFFFF;
       --color-actionSecondary: #F2F2F2;
       --color-actionSecondaryHover: #F2F2F2;
       --color-actionSecondaryHoverText: #1A1A1A;
       --color-actionSecondaryText: #F2F2F2;
       --color-actionBrand: #EF4056;
       --color-actionBrandHover: #901424;
       --color-actionBrandSubdued: #6C000E;
       --color-actionBrandText: #FFFFFF;
       --color-actionFocus: #00CCC0;
       --color-toggleOff: #737373;
       --color-toggleOffHover: #404040;
       --color-formFieldFocusLabel: #00A69C;
       --color-formFieldTextPrimary: #F2F2F2;
       --color-formFieldTextSecondary: #8C8C8C;
       --color-formFieldBorder: #737373;
       --color-formFieldBorderHover: #CCCCCC;
       --color-error: #E55300;
       --color-popoverCanvas: #333333;
       --color-popoverBorder: #595959;
       --color-menuItemHover: #008078;
       --color-menuItemHoverText: #FFFFFF;
       --color-menuItemActive: #004D48;
       --color-navCurrentTab: #274F4C;
       --color-navCurrentTabText: #00CCC0;
       --color-tooltipCanvas: #F2F2F2;
       --color-tooltipText: #1A1A1A;
       --color-dividerPrimary: #CCCCCC;
       --color-dividerSecondary: #737373;
       --color-dividerTertiary: #404040;
       --color-drawerCanvas: #333333;
       --color-calloutBackgroundPrimary: #004D48;
       --color-calloutBackgroundSecondary: #333333;
       --color-calloutAccent: #00CCC0;

       --color-inlineButton: #E8F7F6;
       --color-inlineButtonHover: #E8F7F6;
     }
 
   :root{
     --color-white100: #FFFFFF;
     --color-cream100: #FFFCF7;
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
     --color-teal25: #00403C;
     --color-teal30: #004D48;
     --color-teal45: #00736C;
     --color-teal50: #008078;
     --color-teal60: #009990;
     --color-teal65: #00A69C;
     --color-teal70: #00B2A8;
     --color-teal75: #00BFB4;
     --color-teal80: #00CCC0;
     --color-teal85: #00D9CC;
     --color-teal100: #E8F7F6;
     --color-tealLightestFill: #E0F0EF;
     --color-tealLightestFillSepia: #D8DECF;
     --color-tealLightestFillDark: #274F4C;
     --color-coralDarker: #6C000E;
     --color-coralDark: #901424;
     --color-coral: #EF4056;
     --color-coralLight: #F9BFD1;
     --color-coralLightest: #FDF2F5;
     --color-amberDarker: #B24000;
     --color-amberDark: #E55300;
     --color-amber: #FCB643;
     --color-amberLight: #FFD25E;
     --color-amberLightest: #FFFBE3;
     --color-mintDarker: #0B6639;
     --color-mintDark: #29A668;
     --color-mint: #00CB77;
     --color-mintLight: #82ECB7;
     --color-mintLightest: #C6FFE3;
     --color-lapisDarker: #00256D;
     --color-lapisDark: #1649AC;
     --color-lapis: #3668FF;
     --color-lapisLight: #95D2FF;
     --color-lapisLightest: #DCEAFF;
     --color-apricotDarker: #9F2600;
     --color-apricotDark: #D23807;
     --color-apricot: #F67D6D;
     --color-apricotLight: #FEB69F;
     --color-apricotLightest: #FDF0EC;
     --color-irisDarker: #802AC3;
     --color-irisDark: #9971EF;
     --color-iris: #C4A5F7;
     --color-irisLight: #DAB5FF;
     --color-irisLightest: #F2DEFF;
     --color-brandPocket: #EF4056;
     --color-brandFacebook: #3B5998;
     --color-brandTwitter: #00ACED;
     --color-brandReddit: #FF4500;
     --color-brandLinkedin: #007BB6;
     --fontSansSerif: "Graphik Web", "Helvetica Neue", Helvetica, Arial, Sans-Serif;
    }
  }
`
 
export const radioStyles = css`
  :global() {
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
  }
`
