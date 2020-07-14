import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="#">Bulma</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Components</a></li>
                    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
                </ul>
            </nav>
        );
    }
}

class NavFilter extends Component {
    
    render() {
        return (
            <div>
                <p>
                    Aca va la barra de filtros
                </p>
            </div>
        );
    }
}

export {NavBar, NavFilter};
