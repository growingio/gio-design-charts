import React from 'react';
import './style/Loading.less';

const Loading = () => {
  return (
    <div className="gio-d-charts-loading-wrapper-loading" data-testid="loading">
      <div className="gio-d-charts-loading gio-d-charts-loading-large">
        <div className="gio-d-charts-loading-ring">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`gio-d-charts-loading-ring-line gio-d-charts-loading-ring-line-${item}`}>
              <div className="gio-d-charts-loading-ring-line-cog">
                <div className="gio-d-charts-loading-ring-line-cog-inner gio-d-charts-loading-ring-line-cog-inner-left" />
              </div>
              <div className="gio-d-charts-loading-ring-line-ticker">
                <div className="gio-d-charts-loading-ring-line-cog-inner gio-d-charts-loading-ring-line-cog-inner-center" />
              </div>
              <div className="gio-d-charts-loading-ring-line-cog">
                <div className="gio-d-charts-loading-ring-line-cog-inner gio-d-charts-loading-ring-line-cog-inner-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
