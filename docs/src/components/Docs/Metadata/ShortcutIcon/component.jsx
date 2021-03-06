import React from 'react';
import PropTypes from 'prop-types';
import Raw from 'raw.macro';

import Markdown from '../../Markdown';

import iconGlyphs from './iconGlyphs.js';
import { colors, glyphs } from './iconOptions.js';

import styles from './styles.module.scss';

const content = Raw('./content.md');

const classList = (classNames) => Object
  .entries(classNames)
  .map(([className, condition]) => condition && className)
  .filter(el => el)
  .join(' ');

const glyphList = {};

const glyphSections = glyphs.map(([group, icons]) => (
  [group, icons.map(([name, number]) => {
    glyphList[name] = iconGlyphs[number];
    return [name, iconGlyphs[number]];
  })]
));

const Glyph = ({ data, className, ...props }) => (
  <div
    className={classList({
      [styles.glyphIcon]: true,
      [className]: true,
    })}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${
        data.horizAdvX ? `${data.horizAdvX} 1280` : '1024 1150'
      }`}
    >
      <path d={data.path} />
    </svg>
  </div>
);

Glyph.propTypes = {
  data: PropTypes.object.isRequired,
};

export default class Component extends React.Component {
  state = {
    color: null,
    glyph: null,
    content: null,
  }

  selectColor = (color) => () => {
    this.setState({
      color: color,
      glyph: this.state.glyph || 'ROCKET',
    });
  }

  selectGlyph = (glyph) => () => {
    this.setState({
      color: this.state.color || 'DARK_BLUE',
      glyph: glyph,
    });
  }

  handleClick = (event) => {
    if (this.state.glyph && !event.target.matches(
      [styles.colorIcon, styles.glyphIcon, styles.previewContainer]
        .map((className) => `.${className}, .${className} *`)
        .join(', ')
    )) this.setState({
      color: null,
      glyph: null,
    });
  }

  componentDidMount() {
    document.body.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.handleClick);
  }

  render() {
    return (
      <div className={styles.content}>
        <Markdown
          content={content}
          source="Metadata/ShortcutIcon"
        />

        <h4 id="colors">Icon Colors</h4>

        <div className={styles.container}>
          <div className={styles.iconContainer}>
            {colors.map((color) => (
              <div
                key={color}
                className={classList({
                  [styles.colorIcon]: true,
                  [styles.selected]: this.state.color === color,
                })}
                onClick={this.selectColor(color)}
              >
                <div className={classList({
                  [styles.inner]: true,
                  [styles[`color--${color}`]]: true,
                })} />
              </div>
            ))}
          </div>
        </div>

        <h4 id="glyphs">Icon Glyphs</h4>

        {glyphSections.map(([group, icons]) => (
          <div
            key={group}
            className={styles.container}
          >
            <h5 className={styles.iconHeader}>{group}</h5>
            <div className={styles.iconContainer}>
              {icons.map(([name, data]) => (
                <Glyph
                  key={name}
                  data={data}
                  onClick={this.selectGlyph(name)}
                  className={classList({
                    [styles.selected]: this.state.glyph === name,
                  })}
                />
              ))}
            </div>
          </div>
        ))}

        <div className={classList({
          [styles.previewContainer]: true,
          [styles.hidden]: !this.state.glyph,
        })}>
          <div className={styles.previewBox}>

            <div className={styles.section}>
              <span>Color</span>
              <code>.{this.state.color}</code>
            </div>

            <div className={styles.section}>
              <span>Glyph</span>
              <code>.{this.state.glyph}</code>
            </div>

            {this.state.glyph && <Glyph
              data={glyphList[this.state.glyph]}
              className={classList({
                [styles.previewIcon]: true,
                [styles[`color--${this.state.color}`]]: true,
              })}
            />}

          </div>
        </div>

      </div>
    );
  }
};

export { Glyph };
