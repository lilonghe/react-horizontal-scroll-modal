import { ReactNode, useEffect, useRef, UIEvent } from 'react';
import styles from './index.module.css';
import classNames from 'classnames';

interface IHorizontalScrollProps {
  children: ReactNode
  visible?: boolean
  animationTime?: number
  closeIcon?: string
  onClose?: () => void
  closeNode?: ReactNode
  wrapperClassName?: string
  contentClassName?: string
  showControl?: boolean
}

const HorizontalScroll = ({ children, visible = true, wrapperClassName, contentClassName, animationTime = 1000, closeIcon, onClose, closeNode, showControl = true }: IHorizontalScrollProps) => {
    const bodyOverflow = useRef('');
    const progressIndicator = useRef<HTMLDivElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const panel = useRef<HTMLDivElement>(null);

    const handleOnScroll = (target: HTMLDivElement) => {
        const scrollTop = target.scrollTop;
        let percent = scrollTop / (target.scrollHeight - target.offsetHeight);
        if (content.current?.scrollWidth === window.innerWidth) {
            percent = 1;
        }
        
        if (progressIndicator.current) {
          progressIndicator.current.style.transform = 'scaleX(' + percent + ')';
        }
        if (content.current) {
          content.current.style.transform = `translateX(-${scrollTop}px)`;
        }
    }

    const handleOnResize = () => {
      if (!content.current || !scroll.current) return;
        const diffSize = Math.max(content.current.scrollWidth - window.innerWidth, 0);
        scroll.current.style.setProperty('--scroll-height', window.innerHeight + diffSize + 'px');
    }

    const onScroll = (e: any) => {
      handleOnScroll(e.target as HTMLDivElement);
  }

    useEffect(() => {
        if (!panel.current || !scroll.current || !container.current) return;
        bodyOverflow.current = getComputedStyle(document.body).overflow;
        panel.current.style.setProperty('--toggle-animation-time', animationTime + 'ms');

        handleOnResize();
        handleOnScroll(scroll.current);
        
        const onResize = () => {
            handleOnResize();
            scroll.current && handleOnScroll(scroll.current);
        }
        
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => {
                document.body.style.overflow = bodyOverflow.current;
                container.current && (container.current.scrollTop = 0);
            }, animationTime);
        }
    }, [visible])

    return (
        <div className={styles.horizontalScrollModal}>
            <div ref={panel} className={classNames(styles.horizontalScrollPanel, { [styles.visible]: visible }, wrapperClassName)}>
                <div ref={container} className={classNames(styles.horizontalScrollContainer)} onScroll={onScroll}>
                    <div ref={scroll} className={styles.horizontalScroll}>
                        <div ref={content} className={classNames(styles.horizontalContent, contentClassName)}>
                            {children}
                        </div>
                    </div>
                </div>
                {showControl && <div className={styles.deepDive}>
                    {closeIcon && <span className={styles.closeBtn}>
                        <img alt='close' onClick={onClose} src={closeIcon} width={30} />
                    </span>}
                    {closeNode}
                    <div className={styles.deepDiveProgress}>
                        <div ref={progressIndicator} className={styles.deepDiveProgressIndicator}></div>
                    </div>
                </div>}
            </div>
            
        </div>
    )
}

export default HorizontalScroll;